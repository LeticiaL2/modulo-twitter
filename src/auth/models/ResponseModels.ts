import { ApiProperty } from '@nestjs/swagger';

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
