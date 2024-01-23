import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseModel<T> {
  @ApiProperty({
    description: 'Booleano indicando sucesso ou falha',
    example: 'boolean',
  })
  status: boolean;

  @ApiProperty({
    description: 'Mensagem informativa da requisição',
    type: () => ({
      codigo: {
        description: 'Código da mensagem',
        example: 'Number',
        type: Number,
      },
      texto: {
        description: 'Texto da mensagem',
        example: 'String',
        type: String,
      },
    }),
  })
  mensagem: {
    codigo: number;
    texto: string;
  };

  @ApiProperty({
    description: 'Retorno principal do serviço',
  })
  conteudo: T;
}

export class ResponseWithoutDataModel {
  @ApiProperty({
    description: 'Booleano indicando o sucesso ou falha da consulta',
  })
  status: boolean;

  @ApiProperty({
    description: 'Mensagem informativa da requisição',
    type: () => ({
      codigo: {
        description: 'Código da mensagem',
        example: 'Código da mensagem',
        type: String,
      },
      texto: {
        description: 'Texto da mensagem',
        example: 'Texto indicando falha ou sucesso da operação',
        type: String,
      },
    }),
  })
  mensagem: {
    codigo: number;
    texto: string;
  };
}

export class ResponseListModel<T> extends ResponseWithoutDataModel {
  @ApiPropertyOptional({
    description: 'Retorno principal do serviço',
    isArray: true,
  })
  conteudo?: T[];
}
