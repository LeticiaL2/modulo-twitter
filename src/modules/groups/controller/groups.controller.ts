import {
  Controller,
  UseGuards,
  Get,
  Param,
  Req,
  Res,
  Query,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GroupsService } from 'src/modules/groups/service/groups.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import {
  AcaoAlteracaoGrupoModel,
  AcaoNovoGrupoModel,
  GruposQueryModel,
  GruposModel,
  GrupoModel,
} from '../dto/groups';
import {
  ApiResponseCustom,
  ApiResponseCustomList,
  HasAccess,
} from 'src/utils/decorators';
import { enumAcao } from 'src/utils/enums';
import {
  ResponseModel,
  ResponsePaginatedModel,
  ResponseWithoutDataModel,
} from 'src/utils/models';
import { MaskData } from 'src/utils/decorators';

@Controller()
@ApiTags('Grupos')
export class GroupsController {
  constructor(private readonly GroupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/grupos')
  @MaskData('nome')
  @ApiOperation({
    summary: 'Listar grupos',
  })
  @ApiResponseCustomList(ResponsePaginatedModel, GruposModel, 200)
  @ApiResponse({ status: 404, type: ResponseWithoutDataModel })
  async listarGrupos(
    @HasAccess(enumAcao.sisGrupoListar.nome) value: boolean,
    @Req() req,
    @Query() objQuery: GruposQueryModel,
  ) {
    const accept = req.headers.accept;
    if (accept == 'text/csv') {
      return await this.GroupsService.getGroupsFile(accept, objQuery);
    } else {
      return await this.GroupsService.getGroups(objQuery);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/grupos')
  @ApiOperation({
    summary: 'Criar novo grupo',
  })
  @ApiResponse({ status: 200, type: ResponseWithoutDataModel })
  @ApiResponse({ status: 404, type: ResponseWithoutDataModel })
  @ApiBody({
    type: AcaoNovoGrupoModel,
  })
  async criarGrupo(
    @HasAccess(enumAcao.sisGrupoCriar.nome) value: boolean,
    @Res() res,
    @Body() body: AcaoNovoGrupoModel,
  ) {
    const returnCreate = await this.GroupsService.setGroup(body);

    if (!returnCreate.Sucesso) {
      return res.status(400).json(returnCreate);
    }

    return res.send(returnCreate);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/grupos/:id_grupo')
  @ApiOperation({
    summary: 'Carregar detalhes do grupo',
  })
  @ApiResponseCustom(ResponseModel, GrupoModel, 200)
  @ApiResponse({ status: 404, type: ResponseWithoutDataModel })
  @ApiParam({ name: 'id_grupo', description: 'O ID do grupo' })
  async detalhesGrupo(
    @HasAccess(enumAcao.sisGrupoListar.nome) value: boolean,
    @Param('id_grupo') id_grupo: string,
  ) {
    const returnCreate = await this.GroupsService.getGroupById(id_grupo);

    return returnCreate;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/grupos/:id_grupo')
  @ApiOperation({
    summary: 'Alterar dados do grupo',
  })
  @ApiResponse({ status: 200, type: ResponseWithoutDataModel })
  @ApiResponse({ status: 404, type: ResponseWithoutDataModel })
  @ApiBody({
    type: AcaoAlteracaoGrupoModel,
  })
  @ApiParam({ name: 'id_grupo', description: 'O ID do grupo' })
  async permissoesGrupo(
    @HasAccess(enumAcao.alteracaoGrupo.nome) value: boolean,
    @Param('id_grupo') id_grupo: string,
    @Body() body: AcaoAlteracaoGrupoModel,
    @Req() req,
    @Res() res,
  ) {
    const returnCreate = await this.GroupsService.setGroupActionsById(
      req.user,
      id_grupo,
      body,
    );

    if (!returnCreate.Sucesso) {
      return res.status(400).json(returnCreate);
    }

    return res.send(returnCreate);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/grupos/:id_grupo')
  @ApiOperation({
    summary: 'Excluir grupo',
  })
  @ApiResponse({ status: 200, type: ResponseWithoutDataModel })
  @ApiResponse({ status: 404, type: ResponseWithoutDataModel })
  @ApiParam({ name: 'id_grupo', description: 'O ID do grupo' })
  async excluirGrupo(
    @HasAccess(enumAcao.excluirGrupo.nome) value: boolean,
    @Param('id_grupo') id_grupo: string,
    @Req() req,
    @Res() res,
  ) {
    const returnCreate = await this.GroupsService.excludeGroupById(
      req.user,
      id_grupo,
    );

    if (!returnCreate.Sucesso) {
      return res.status(400).json(returnCreate);
    }

    return res.send(returnCreate);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/grupos/:id_grupo/usuario/:id_usuario')
  @ApiOperation({
    summary: 'Adicionar usuário à grupo',
  })
  @ApiResponse({ status: 200, type: ResponseWithoutDataModel })
  @ApiResponse({ status: 404, type: ResponseWithoutDataModel })
  @ApiParam({ name: 'id_grupo', description: 'O ID do grupo' })
  async addUsuarioGrupo(
    @HasAccess(enumAcao.vincularUsuarioGrupo.nome) value: boolean,
    @Param('id_grupo') id_grupo: string,
    @Param('id_usuario') id_usuario: string,
    @Req() req,
    @Res() res,
  ) {
    const returnCreate = await this.GroupsService.setUserToGroup(
      req.user,
      id_grupo,
      id_usuario,
    );

    if (!returnCreate.Sucesso) {
      return res.status(400).json(returnCreate);
    }

    return res.send(returnCreate);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/grupos/:id_grupo/usuario/:id_usuario')
  @ApiOperation({
    summary: 'Excluir usuário do grupo',
  })
  @ApiResponse({ status: 200, type: ResponseWithoutDataModel })
  @ApiResponse({ status: 404, type: ResponseWithoutDataModel })
  @ApiParam({ name: 'id_grupo', description: 'O ID do grupo' })
  async excluirUsuarioGrupo(
    @HasAccess(enumAcao.desvincularUsuarioGrupo.nome) value: boolean,
    @Param('id_grupo') id_grupo: string,
    @Param('id_usuario') id_usuario: string,
    @Req() req,
    @Res() res,
  ) {
    const returnCreate = await this.GroupsService.excludeUserToGroup(
      req.user,
      id_grupo,
      id_usuario,
    );

    if (!returnCreate.Sucesso) {
      return res.status(400).json(returnCreate);
    }

    return res.send(returnCreate);
  }
}
