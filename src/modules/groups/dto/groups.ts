import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { enumSortGroups } from 'src/utils/enums';
import { RequestPaginatedModel } from 'src/utils/models';

export class GruposModel {
  @ApiProperty()
  ID: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  analise_processos: boolean;

  @ApiProperty()
  numero_usuarios: number;
}

export class UsuariosModel {
  @ApiProperty()
  ID_usuario: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: number;
}

export class AcaoModel {
  @ApiProperty()
  enum: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  valor: boolean;
}

export class GrupoModel {
  @ApiProperty()
  ID: string;

  @ApiProperty()
  nome: string;

  @ApiProperty({
    type: () => AcaoModel,
    isArray: true,
  })
  acoes: any;

  @ApiProperty()
  analise_processos: boolean;

  @ApiProperty({
    type: () => UsuariosModel,
    isArray: true,
  })
  usuarios?: UsuariosModel[];
}

export class AcaoAlteracaoGrupoModel {
  @ApiPropertyOptional()
  nome?: string;

  @ApiPropertyOptional()
  acoes?: string[];

  @ApiPropertyOptional()
  tags?: string[];

  @ApiPropertyOptional()
  analise_processos: boolean;
}

export class AcaoNovoGrupoModel {
  @ApiProperty()
  nome: string;

  @ApiPropertyOptional()
  acoes?: string[];

  @ApiPropertyOptional()
  tags?: string[];

  @ApiPropertyOptional()
  analise_processos?: boolean;
}

// Query classes

export class GrupoQueryModel {
  @ApiPropertyOptional()
  nome: string;

  @ApiPropertyOptional()
  tag: string;
}

export class GruposQueryModel extends RequestPaginatedModel {
  @ApiPropertyOptional()
  nome: string;

  @ApiPropertyOptional()
  tag: string;

  @ApiPropertyOptional({
    description:
      'Ordenação da lista de grupos. Para combinação, enviar os valores concatenados unidos por vírgula.',
    example: Object.keys(enumSortGroups).join(', '),
  })
  @IsOptional()
  sort: string;
}
