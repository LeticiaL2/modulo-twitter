import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { IsCPF } from './decorators';
import { Transform } from 'class-transformer';

export class ResponseWithoutDataModel {
  @ApiProperty({
    description: 'Booleano indicando o sucesso ou falha da consulta',
  })
  Sucesso: boolean;

  @ApiProperty({
    description: 'Mensagem informativa da requisição',
  })
  Mensagem: string;
}

export class ResponseListModel<T> extends ResponseWithoutDataModel {
  @ApiPropertyOptional({
    description: 'Retorno principal do serviço',
    isArray: true,
  })
  Data?: T[];
}

export class ResponseModel<T> {
  @ApiProperty({
    description: 'Booleano indicando o sucesso ou falha da consulta',
  })
  Sucesso: boolean;

  @ApiProperty({
    description: 'Mensagem informativa da requisição',
  })
  Mensagem: string;

  @ApiPropertyOptional({
    description: 'Retorno principal do serviço',
  })
  Data?: T;
}

export class ResponsePaginatedModel<T> extends ResponseModel<T> {
  @ApiProperty({ description: 'Número de registros por página' })
  pageSize: number;

  @ApiProperty({ description: 'Número da página atual' })
  page: number;

  @ApiProperty({ description: 'Total de registros' })
  total: number;

  @ApiProperty({ description: 'Total de páginas' })
  totalPages: number;
}

export class RequestPaginatedModel {
  @ApiPropertyOptional({ description: 'Número de registros por página' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  pageSize: number;

  @ApiPropertyOptional({ description: 'Número da página atual' })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page: number;
}

export class RequestCPF {
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @IsCPF()
  @ApiProperty({
    description: 'CPF do cliente',
    minLength: 11,
    maxLength: 11,
  })
  CPF: string;
}

export class RequestMotivo {
  @IsNotEmpty()
  @ApiProperty({ description: 'Motivo registrado na auditoria' })
  motivo: string;
}
