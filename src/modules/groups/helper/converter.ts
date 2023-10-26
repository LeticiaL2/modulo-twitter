import { enumAcao } from 'src/utils/enums';

export function rulesToActions(rules: string) {
  const acoes = rules.split(',');
  const payload = [];

  Object.keys(enumAcao).forEach((acao) => {
    payload.push({
      enum: acao,
      descricao: enumAcao[acao].descricao,
      valor: acoes.includes(acao),
    });
  });

  return payload;
}
