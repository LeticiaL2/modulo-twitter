import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { enumSortGroups } from 'src/utils/enums';
import { SqlService } from 'src/modules/sql/service/sql.service';
import {
  AcaoAlteracaoGrupoModel,
  AcaoNovoGrupoModel,
  GruposQueryModel,
} from '../dto/groups';
import { CryptoService } from 'src/modules/crypto/service/crypto.service';
import { rulesToActions } from '../helper/converter';
import { calcPagination, concatSort } from 'src/utils/functions';
import { FileBuilder } from 'src/utils/file-builder';
import { ResponseWithoutDataModel } from 'src/utils/models';

@Injectable()
export class GroupsService {
  constructor(
    private sqlService: SqlService,
    private cryptoService: CryptoService,
  ) {}

  async getGroupsADO(objQuery, paginated = true) {
    objQuery.page = objQuery.page ?? 1;
    objQuery.pageSize = objQuery.pageSize ?? 50;
    const { nome, tag, pageSize, page, sort } = objQuery;

    let where = `WHERE 1 = 1`;

    if (nome != null) {
      where += `AND g.DS_NOME Like '%' + @nome + '%' COLLATE SQL_Latin1_General_CP1_CI_AI`;
    }

    if (tag != null) {
      where += `AND g.CL_TAGS Like '%' + @tag + '%'`;
    }

    const countQuery = `
      SELECT COUNT(*) as total FROM GRUPO as g ${where}`;
    const countResult = await this.sqlService.execute(countQuery, objQuery);

    const total = countResult[0]?.total ?? 0;

    if (total == 0) {
      throw new NotFoundException({
        Sucesso: false,
        Mensagem: 'Nenhuma grupo encontrado',
      });
    }

    if (!total) {
      throw new BadRequestException({
        Sucesso: false,
        Mensagem: 'Erro ao consultar dados',
      });
    }

    const [totalPages, offset] = calcPagination(total, page, pageSize);

    const orderBy =
      'ORDER BY ' +
      (sort
        ? concatSort(sort, enumSortGroups, 'g.DS_NOME DESC')
        : 'g.DS_NOME DESC');

    const query = `
      SELECT
        g.INT_ID AS ID,
        g.DS_NOME AS nome,
        COUNT(ug.INT_USUARIO_ID) AS numero_usuarios,
        g.CL_TAGS AS tags
      FROM GRUPO g
      LEFT JOIN USUARIO_GRUPO ug ON ug.INT_GRUPO_ID = g.INT_ID
      ${where != null ? where : ''}
      GROUP BY g.INT_ID, g.DS_NOME, g.CL_TAGS
      ${orderBy}
      ${
        paginated
          ? `OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`
          : ''
      };`;
    const groups = await this.sqlService.execute(query, objQuery);

    return [page, pageSize, totalPages, total, groups];
  }

  async getGroups(objQuery: GruposQueryModel) {
    const [page, pageSize, totalPages, total, data] = await this.getGroupsADO(
      objQuery,
    );

    if (data.length == 0) {
      throw new NotFoundException({
        Sucesso: false,
        Mensagem: 'Nenhuma grupo encontrado',
      });
    }

    if (!data) {
      throw new BadRequestException({
        Sucesso: false,
        Mensagem: 'Erro ao consultar dados',
      });
    }

    const groups = data.map(({ ID, nome, numero_usuarios, tags }) => ({
      ID: this.cryptoService.encrypt(ID.toString()),
      nome,
      analise_processos: tags
        ? tags.split(',').includes('analiseAberturaConta')
        : false,
      numero_usuarios,
    }));

    const retorno = {
      Sucesso: true,
      Mensagem: 'OK',
      Data: groups,
      pageSize,
      page,
      total,
      totalPages,
    };

    return retorno;
  }

  async getGroupsFile(accept: string, objQuery: GruposQueryModel) {
    const [page, pageSize, totalPages, total, data] = await this.getGroupsADO(
      objQuery,
      false,
    );

    if (data.length == 0) {
      throw new NotFoundException({
        Sucesso: false,
        Mensagem: 'Nenhuma análise encontrada',
      });
    }

    if (!data) {
      throw new BadRequestException({
        Sucesso: false,
        Mensagem: 'Erro ao consultar dados',
      });
    }

    function convertBody(accept: string, data) {
      if (accept == 'text/csv') {
        const header = 'ID, nome, numero_usuarios';
        let bodyCsvData = [];
        let csvData = '';
        bodyCsvData = data
          .map((row) => {
            return `${row?.ID},${row?.nome},${row?.numero_usuarios}`;
          })
          .join('\n');
        csvData = `${header}\n${bodyCsvData}`;
        return csvData;
      } else {
        return '';
      }
    }

    const FileName = 'grupos.csv';
    const fileConfig = new FileBuilder(accept, FileName, data, convertBody);

    return fileConfig;
  }

  async setGroup(body: AcaoNovoGrupoModel): Promise<ResponseWithoutDataModel> {
    const acoes = body.acoes ? body.acoes.join(',') : '';
    const tagsArray = body.tags ? body.tags : [];
    if (body.analise_processos != null && body.analise_processos) {
      tagsArray.push('analiseAberturaConta');
    }

    const tags = Array.from(new Set(tagsArray.filter((value) => value !== '')));

    const params = { nome: body.nome };
    const query = `
    INSERT INTO GRUPO (DS_NOME, CL_RULES, CL_TAGS)
    VALUES (@nome, '${acoes}', '${tags.join(',')}');`;

    await this.sqlService.execute(query, params);

    const retorno = {
      Sucesso: true,
      Mensagem: 'OK',
    };

    return retorno;
  }

  async getGroup(id: string) {
    id = this.cryptoService.decrypt(id);
    const params = { id };
    const query = `
    SELECT 
      g.INT_ID AS ID,
      g.DS_NOME AS nome,
      g.CL_RULES AS acoes,
      g.CL_TAGS AS tags,
      COUNT(ug.INT_USUARIO_ID) AS numero_usuarios
    FROM GRUPO g
    LEFT JOIN USUARIO_GRUPO ug ON ug.INT_GRUPO_ID = g.INT_ID
    WHERE g.INT_ID = @id
    GROUP BY g.INT_ID, g.DS_NOME, g.CL_RULES, g.CL_TAGS;`;

    const groupData = await this.sqlService.execute(query, params);

    return groupData.length > 0 ? groupData[0] : null;
  }

  async getUserByGroupIdADO(id: string) {
    id = this.cryptoService.decrypt(id);
    const params = { id };

    const query = `
    SELECT
      u.INT_ID AS ID,
      u.DS_NOME AS nome,
      u.DS_EMAIL AS email
    FROM USUARIO_GRUPO ug 
    INNER JOIN USUARIO u 
    ON u.INT_ID = ug.INT_USUARIO_ID 
    WHERE ug.INT_GRUPO_ID = @id;`;

    const usersData = await this.sqlService.execute(query, params);

    return usersData;
  }

  async getGroupByIdADO(id: string) {
    const groupData = await this.getGroup(id);
    const usersData = await this.getUserByGroupIdADO(id);

    let resGroup;
    if (groupData != null) {
      let users = null;
      if (usersData != null) {
        users = usersData.map(({ ID, nome, email }) => ({
          ID: this.cryptoService.encrypt(ID.toString()),
          nome,
          email,
        }));
      }

      const tags = groupData.tags ? groupData.tags.split(',') : [];
      resGroup = {
        ID: id,
        nome: groupData.nome,
        analise_processos: tags.includes('analiseAberturaConta'),
        acoes: rulesToActions(groupData.acoes ? groupData.acoes : ''),
        usuarios: users,
      };
    } else {
      throw new NotFoundException({
        Sucesso: false,
        Mensagem: 'Grupo não encontrado',
      });
    }
    const retorno = {
      Sucesso: true,
      Mensagem: 'OK',
      Data: resGroup,
    };

    return retorno;
  }

  async getGroupById(id: string) {
    const resGroup = await this.getGroupByIdADO(id);

    if (!resGroup) {
      throw new BadRequestException({
        Sucesso: false,
        Mensagem: 'Erro ao consultar dados',
      });
    }

    return resGroup;
  }

  async setGroupActionsById(
    user: any,
    id: string,
    body: AcaoAlteracaoGrupoModel,
  ): Promise<ResponseWithoutDataModel> {
    const setParams = [];
    const params = {
      id: this.cryptoService.decrypt(id),
    };
    const newValues = {};
    const groupData = await this.getGroup(id);
    const { ID, ...oldValues } = groupData;

    if (body.nome != null) {
      newValues['nome'] = body.nome;
      setParams.push(`DS_NOME = @nome`);
    }

    if (body.acoes != null) {
      newValues['acoes'] = body.acoes.join(',');
      setParams.push(`CL_RULES = @acoes`);
    }

    if (body.analise_processos != null) {
      if (groupData) {
        let tagsArray = groupData?.tags?.split(',');

        if (body.tags != null) {
          tagsArray = body.tags;
        }

        if (!body.analise_processos)
          tagsArray = tagsArray.filter(
            (item) => item !== `analiseAberturaConta`,
          );
        else {
          tagsArray.push(`analiseAberturaConta`);
        }

        newValues['tags'] = Array.from(
          new Set(tagsArray.filter((value) => value !== '')),
        ).join(',');
        setParams.push(`CL_TAGS = @tags`);
      }
    } else if (body.tags != null) {
      newValues['tags'] = body.tags.join(',');

      setParams.push(`CL_TAGS = @tags`);
    }

    const query = `
    UPDATE GRUPO
      SET ${setParams.join(',')}
      WHERE INT_ID =  @id;`;

    await this.sqlService.execute(query, { ...params, ...newValues });

    const retorno = {
      Sucesso: true,
      Mensagem: 'OK',
    };

    return retorno;
  }

  async excludeGroupById(
    user: any,
    id: string,
  ): Promise<ResponseWithoutDataModel> {
    const int_id = this.cryptoService.decrypt(id);
    const groupData = await this.getGroup(id);
    const params = { int_id };

    const queryGroupUser = `
    DELETE FROM USUARIO_GRUPO
      WHERE INT_GRUPO_ID =  @int_id;`;

    await this.sqlService.execute(queryGroupUser, params);

    const query = `
    DELETE FROM GRUPO
      WHERE INT_ID =  @int_id;`;

    await this.sqlService.execute(query, params);

    const retorno = {
      Sucesso: true,
      Mensagem: 'OK',
    };

    return retorno;
  }

  async setUserToGroup(
    user: any,
    id: string,
    id_usuario: string,
  ): Promise<ResponseWithoutDataModel> {
    id = this.cryptoService.decrypt(id);
    id_usuario = this.cryptoService.decrypt(id_usuario);
    const params = { id, id_usuario };
    const query = `
    INSERT INTO USUARIO_GRUPO (INT_GRUPO_ID, INT_USUARIO_ID)
    VALUES (@id, @id_usuario);`;

    await this.sqlService.execute(query, params);

    const retorno = {
      Sucesso: true,
      Mensagem: 'OK',
    };

    return retorno;
  }

  async excludeUserToGroup(
    user: any,
    id_grupo: string,
    id_usuario: string,
  ): Promise<ResponseWithoutDataModel> {
    id_grupo = this.cryptoService.decrypt(id_grupo);
    id_usuario = this.cryptoService.decrypt(id_usuario);
    const params = { id_grupo, id_usuario };
    const query = `
    DELETE FROM USUARIO_GRUPO
      WHERE INT_GRUPO_ID = @id_grupo AND INT_USUARIO_ID = @id_usuario;`;

    await this.sqlService.execute(query, params);

    const retorno = {
      Sucesso: true,
      Mensagem: 'OK',
    };

    return retorno;
  }
}
