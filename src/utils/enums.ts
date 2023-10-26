export enum enumEtapa {
  pendenteDadosDataNascimento = 'EM ANDAMENTO: Informar Data de Nascimento',
  pendenteDadosCelular = 'EM ANDAMENTO: Informar Celular',
  pendenteVerificacaoCelular = 'EM ANDAMENTO: Validar Celular',
  pendenteDadosEmail = 'EM ANDAMENTO: Informar E-mail',
  pendenteVerificacaoEmail = 'EM ANDAMENTO: Validar E-mail',
  pendenteDadosNacionalidade = 'EM ANDAMENTO: Informar Nacionalidade',
  pendenteDadosNaturalidade = 'EM ANDAMENTO: Informar Naturalidade',
  pendenteDadosEndereco = 'EM ANDAMENTO: Informar Endereço',
  pendenteDadosOcupacao = 'EM ANDAMENTO: Informar Ocupação',
  pendenteDadosProfissao = 'EM ANDAMENTO: Informar Profissão',
  pendenteDadosRenda = 'EM ANDAMENTO: Informar Renda Mensal',
  pendenteDocumentos = 'EM ANDAMENTO: Enviar Selfie e Documentos',
  pendenteDadosDocumentos = 'EM ANDAMENTO: Complementar Documentos',
  cadastroInapto = 'ERRO: Preenchimento Interrompido por CPF Inválido',
  pendenteConfirmacao = 'ERRO DE SISTEMA: Confirmação Pendente',
  erroEnvioAprovacao = 'ERRO: Confirmação com Erro no Envio para Unico',
  pendenteAprovacao = 'CONFIRMAÇÃO: Em Análise',
  cadastroDocumentosInvalidos = 'ERRO: Confirmação com Erro no Envio para Unico (Docs Inválidos)',
  cadastroDadosInconsistentes = 'ERRO: Confirmação com Erro no Envio para Unico (Docs Inconsistentes)',
  cadastroReprovado = 'CONFIRMAÇÃO: Reprovada',
  cadastroAprovado = 'ERRO: Status Indevido (cadastroAprovado)',
  erroAtualizacaoBaseCentralizada = 'ERRO: Confirmação com Erro no Envio para SICRED',
  cadastroAplicadoBaseCentralizada = 'ERRO: Status Indevido (cadastroAplicadoBaseCentralizada)',
  erroAberturaConta = 'ERRO: Confirmação com Erro no Envio para Lydians',
  contaAberta = 'CONFIRMAÇÃO: Aprovada. Ativação Pendente (conta já aberta)',
  contaAbertaEmOutroDispositivo = 'CONFIRMAÇÃO: Aprovada. Ativação Pendente (conta aberta em outro dispositivo)',
  contaAbertaPendenteAtivacao = 'CONFIRMAÇÃO: Aprovada. Ativação Pendente (conta aberta no dispositivo acessado)',
  contaAtiva = 'CONFIRMAÇÃO: Aprovada. Ativação CC Aberta',
}

export enum enumCamposProcesso {
  'nome' = 'DS_NOME',
  'data_nascimento' = 'DT_NASCIMENTO',
  'celular' = 'DS_CELULAR',
  'email' = 'DS_EMAIL',
  'endereco' = 'endereco',
  'endereco.tipo' = 'DS_END_TIPO',
  'endereco.logradouro' = 'DS_END_RUA',
  'endereco.numero' = 'DS_END_NUMERO',
  'endereco.complemento' = 'DS_END_COMPLEMENTO',
  'endereco.CEP' = 'DS_END_CEP',
  'endereco.bairro' = 'DS_END_BAIRRO',
  'endereco.cidade' = 'DS_END_CIDADE',
  'endereco.UF' = 'DS_END_ESTADO',
  'nacionalidade' = 'DS_NACIONALIDADE',
  'naturalidade' = 'naturalidade',
  'naturalidade_cidade' = 'DS_NAT_CIDADE',
  'naturalidade_uf' = 'DS_NAT_UF',
  'dados_profissionais.ocupacao' = 'DS_OCUPACAO',
  'dados_profissionais.profissao' = 'DS_PROFISSAO',
  'dados_profissionais.renda' = 'NM_RENDA',
  'RG' = 'rg',
  'RG.numero' = 'DS_RG',
  'RG.data_emissao' = 'DT_RG_EMISSAO',
  'RG.orgao_emissor' = 'DS_RG_ORGAO_EMISSOR',
  'RG.UF' = 'DS_RG_UF',
  'CNH' = 'cnh',
  'CNH.numero' = 'DS_CNH',
  'CNH.data_emissao' = 'DT_CNH_EMISSAO',
  'CNH.UF' = 'DS_CNH_UF',
}

export enum enumProcessosStatus {
  pendenteDadosDataNascimento = 'nascimento',
  pendenteDadosCelular = 'celular',
  pendenteVerificacaoCelular = 'celular_verificado',
  pendenteDadosEmail = 'email',
  pendenteVerificacaoEmail = 'email_verificado',
  pendenteDadosNacionalidade = 'nacionalidade',
  pendenteDadosNaturalidade = 'nat_cidade',
  pendenteDadosEndereco = 'end_cep',
  pendenteDadosOcupacao = 'ocupacao',
  pendenteDadosProfissao = 'profissao',
  pendenteDadosRenda = 'renda',
  pendenteDocumentos = 'status_unico',
  pendenteDadosDocumentos = 'rg',
  contaAberta = 'conta',
  contaAtiva = 'conta',
}

export const ContaNovaStatus = {
  pendenteDadosDataNascimento: {
    pode_redirecionar: true,
    ordem: 0,
    nome: 'pendenteDadosDataNascimento',
  },
  pendenteDadosCelular: {
    pode_redirecionar: true,
    ordem: 1,
    nome: 'pendenteDadosCelular',
  },
  pendenteVerificacaoCelular: {
    pode_redirecionar: false,
    ordem: 99,
    nome: 'pendenteVerificacaoCelular',
  },
  pendenteDadosEmail: {
    pode_redirecionar: true,
    ordem: 2,
    nome: 'pendenteDadosEmail',
  },
  pendenteVerificacaoEmail: {
    pode_redirecionar: false,
    ordem: 99,
    nome: 'pendenteVerificacaoEmail',
  },
  pendenteDadosNacionalidade: {
    pode_redirecionar: true,
    ordem: 3,
    nome: 'pendenteDadosNacionalidade',
  },
  pendenteDadosNaturalidade: {
    pode_redirecionar: true,
    ordem: 4,
    nome: 'pendenteDadosNaturalidade',
  },
  pendenteDadosEndereco: {
    pode_redirecionar: true,
    ordem: 5,
    nome: 'pendenteDadosEndereco',
  },
  pendenteDadosOcupacao: {
    pode_redirecionar: true,
    ordem: 6,
    nome: 'pendenteDadosOcupacao',
  },
  pendenteDadosProfissao: {
    pode_redirecionar: true,
    ordem: 7,
    nome: 'pendenteDadosProfissao',
  },
  pendenteDadosRenda: {
    pode_redirecionar: true,
    ordem: 8,
    nome: 'pendenteDadosRenda',
  },
  pendenteDocumentos: {
    pode_redirecionar: true,
    ordem: 9,
    nome: 'pendenteDocumentos',
  },
  pendenteDadosDocumentos: {
    pode_redirecionar: true,
    ordem: 10,
    nome: 'pendenteDadosDocumentos',
  },
  cadastroInapto: {
    pode_redirecionar: false,
    ordem: 99,
    nome: 'cadastroInapto',
  },
  pendenteConfirmacao: {
    pode_redirecionar: false,
    ordem: 100,
    nome: 'pendenteConfirmacao',
  },
  erroEnvioAprovacao: {
    pode_redirecionar: false,
    ordem: 101,
    nome: 'erroEnvioAprovacao',
  },
  pendenteAprovacao: {
    pode_redirecionar: false,
    ordem: 203,
    nome: 'pendenteAprovacao',
  },
  cadastroDocumentosInvalidos: {
    pode_redirecionar: false,
    ordem: 200,
    nome: 'cadastroDocumentosInvalidos',
  },
  cadastroDadosInconsistentes: {
    pode_redirecionar: false,
    ordem: 201,
    nome: 'cadastroDadosInconsistentes',
  },
  cadastroReprovado: {
    pode_redirecionar: false,
    ordem: 202,
    nome: 'cadastroReprovado',
  },
  cadastroAprovado: {
    pode_redirecionar: false,
    ordem: 204,
    nome: 'cadastroAprovado',
  },
  erroAtualizacaoBaseCentralizada: {
    pode_redirecionar: false,
    ordem: 300,
    nome: 'erroAtualizacaoBaseCentralizada',
  },
  cadastroAplicadoBaseCentralizada: {
    pode_redirecionar: false,
    ordem: 301,
    nome: 'cadastroAplicadoBaseCentralizada',
  },
  erroAberturaConta: {
    pode_redirecionar: false,
    ordem: 400,
    nome: 'erroAberturaConta',
  },
  contaAberta: {
    pode_redirecionar: false,
    ordem: 401,
    nome: 'contaAberta',
  },
  contaAbertaEmOutroDispositivo: {
    pode_redirecionar: false,
    ordem: 500,
    nome: 'contaAbertaEmOutroDispositivo',
  },
  contaAbertaPendenteAtivacao: {
    pode_redirecionar: false,
    ordem: 501,
    nome: 'contaAbertaPendenteAtivacao',
  },
  contaAtiva: {
    pode_redirecionar: false,
    ordem: 600,
    nome: 'contaAtiva',
  },
};

export enum TipoDocumento {
  FotoCliente = 1,
  RG = 2,
  CPF = 3,
  CNH = 4,
  COMPROVANTE_DE_RENDA = 5,
  COMPROVANTE_DE_ENDERECO = 6,
  IMPOSTO_DE_RENDA = 7,
  CERTIDAO_DE_CASAMENTO = 8,
  CERTIDAO_DE_OBITO = 9,
  PASSAPORTE = 12,
  CARTAO_CNPJ = 13,
  CONTRATO_SOCIAL = 14,
  CARTEIRA_DE_TRABALHO = 20,
  PAC = 21,
  CTPS = 22,
  IDENTIDADE_DE_CLASSE = 24,
  CERTIDAO_DE_NASCIMENTO = 25,
  TAD = 107,
  ASSINATURA_DIGITAL = 112,
  TERMO_DE_CONSENTIMENTO = 114,
  VOUCHER = 115,
  PROPOSTA = 300,
  PROPOSTA_DE_CONTRATO = 301,
  PROPOSTA_DE_SEGURO = 302,
  PROPOSTA_DE_GARANTIA = 303,
  CNH_FRENTE = 401,
  CNH_VERSO = 402,
  RG_FRENTE = 501,
  RG_VERSO = 502,
  CRM_FRENTE = 503,
  CRM_VERSO = 504,
  IDENTIDADE_MILITAR_FRENTE = 505,
  IDENTIDADE_MILITAR_VERSO = 506,
  OUTROS_5 = 994,
  OUTROS_4 = 995,
  OUTROS_3 = 996,
  OUTROS_2 = 997,
  OUTROS_1 = 998,
  OUTROS = 999,
}

export const enumAcao = {
  aberturaConta: {
    nome: 'aberturaConta',
    descricao: 'Abertura de Contas - Visualizar',
  },
  alteracaoStatus: {
    nome: 'alteracaoStatus',
    descricao: 'Abertura de Contas - Ação - Redirecionar etapa',
  },
  alteracaoCadastral: {
    nome: 'alteracaoCadastral',
    descricao:
      'Abertura de Contas - Ação - Alterar dados cadastrais de cliente',
  },
  consultaUnico: {
    nome: 'consultaUnico',
    descricao:
      'Abertura de Contas - Ação - Realizar nova consulta do processo da unico',
  },
  confirmacaoConta: {
    nome: 'confirmacaoConta',
    descricao:
      'Abertura de Contas - Ação - Tentar novamente finalizar o processo',
  },
  aprovacaoManual: {
    nome: 'aprovacaoManual',
    descricao:
      'Abertura de Contas - Ação - Análise Manual - Aprovar uma abertura de conta',
  },
  reprovacaoManual: {
    nome: 'reprovacaoManual',
    descricao:
      'Abertura de Contas - Ação - Análise Manual - Reprovar uma abertura de conta',
  },
  consultaPH3A: {
    nome: 'consultaPH3A',
    descricao:
      'Riscos - Ação - Realizar uma nova consulta de Situação Fiscal (PH3A)',
  },
  recalcularRisco: {
    nome: 'recalcularRisco',
    descricao: 'Riscos - Ação - Recalcular o risco de cliente',
  },
  definirRiscoManual: {
    nome: 'definirRiscoManual',
    descricao: 'Riscos - Ação - Definir manualmente o risco de cliente',
  },
  alteracaoGrupo: {
    nome: 'alteracaoGrupo',
    descricao: 'Sistema - Grupos de Usuários - Alterar',
  },
  vincularUsuarioGrupo: {
    nome: 'vincularUsuarioGrupo',
    descricao: 'Sistema - Grupos de Usuários - Vincular usuário',
  },
  desvincularUsuarioGrupo: {
    nome: 'desvincularUsuarioGrupo',
    descricao: 'Sistema - Grupos de Usuários - Desvincular usuário',
  },
  excluirGrupo: {
    nome: 'excluirGrupo',
    descricao: 'Sistema - Grupos de Usuários - Excluir',
  },
  sisGrupoCriar: {
    nome: 'sisGrupoCriar',
    descricao: 'Sistema - Grupos de Usuários - Criar',
  },
  sisGrupoListar: {
    nome: 'sisGrupoListar',
    descricao: 'Sistema - Grupos de Usuários - Visualizar',
  },
  sisUsuarioCriar: {
    nome: 'sisUsuarioCriar',
    descricao: 'Sistema - Usuários - Criar',
  },
  sisUsuarioExcluir: {
    nome: 'sisUsuarioExcluir',
    descricao: 'Sistema - Usuários - Excluir',
  },
  sisUsuarioAlterar: {
    nome: 'sisUsuarioAlterar',
    descricao: 'Sistema - Usuários - Alterar',
  },
  sisUsuarioVincularGrupo: {
    nome: 'sisUsuarioVincularGrupo',
    descricao: 'Sistema - Usuários - Vincular grupo',
  },
  sisUsuarioDesvincularGrupo: {
    nome: 'sisUsuarioDesvincularGrupo',
    descricao: 'Sistema - Usuários - Desvincular grupo',
  },
  sisUsuarioListar: {
    nome: 'sisUsuarioListar',
    descricao: 'Sistema - Usuários - Visualizar',
  },
  sisMotorConfigListar: {
    nome: 'sisMotorConfigListar',
    descricao: 'Sistema - Motor de Riscos - Configurador - Visualizar',
  },
  sisMotorConfigAlterar: {
    nome: 'sisMotorConfigAlterar',
    descricao: 'Sistema - Motor de Riscos - Configurador - Alterar',
  },
  sisMotorSimulador: {
    nome: 'sisMotorSimulador',
    descricao: 'Sistema - Motor de Riscos - Simulador',
  },
  contaListar: {
    nome: 'contaListar',
    descricao: 'Contas - Visualizar - Lista de Clientes',
  },
  contaDetalhe: {
    nome: 'contaDetalhe',
    descricao: 'Contas - Visualizar - Detalhes de Cliente',
  },
  contaAlterar: {
    nome: 'contaAlterar',
    descricao: 'Contas - Ação - Alterar dados cadastrais de cliente',
  },
  contaRedefinirSenha: {
    nome: 'contaRedefinirSenha',
    descricao: 'Contas - Ação - Redefinir senhas de acesso e transação',
  },
  auditoriaListar: {
    nome: 'auditoriaListar',
    descricao: 'Auditoria - Visualizar - Lista Geral',
  },
  auditoriaDetalhe: {
    nome: 'auditoriaDetalhe',
    descricao: 'Auditoria - Visualizar - Detalhes',
  },
  auditoriaListaCliente: {
    nome: 'auditoriaListaCliente',
    descricao: 'Auditoria - Visualizar - Lista de um Cliente',
  },
  riscoClienteSimples: {
    nome: 'riscoClienteSimples',
    descricao: 'Riscos - Visualizar - Risco de um cliente',
  },
  riscoClienteDetalhado: {
    nome: 'riscoClienteDetalhado',
    descricao: 'Riscos - Visualizar - Risco detalhado de um cliente',
  },
  sisCadbasicosListar: {
    nome: 'sisCadbasicosListar',
    descricao: 'Sistema - Cadastros Básicos - Listar',
  },
  sisCadbasicosCriar: {
    nome: 'sisCadbasicosCriar',
    descricao: 'Sistema - Cadastros Básicos - Criar',
  },
  sisCadbasicosAlterar: {
    nome: 'sisCadbasicosAlterar',
    descricao: 'Sistema - Cadastros Básicos - Alterar',
  },
  sisCadbasicosExcluir: {
    nome: 'sisCadbasicosExcluir',
    descricao: 'Sistema - Cadastros Básicos - Excluir',
  },
  abertContaListar: {
    nome: 'abertContaListar',
    descricao: 'Abertura de Contas - Visualizar - Lista de Processos',
  },
  abertContaDetalhe: {
    nome: 'abertContaDetalhe',
    descricao: 'Abertura de Contas - Visualizar - Detalhe de Processo',
  },
  solicitaAnaliseExterna: {
    nome: 'solicitaAnaliseExterna',
    descricao: 'Abertura de Contas - Ação - Enviar Processo para análise',
  },
  abertContaExportar: {
    nome: 'abertContaExportar',
    descricao: 'Abertura de Contas - Visualizar - Exportar Dados',
  },
  contaExportar: {
    nome: 'contaExportar',
    descricao: 'Contas - Visualizar - Exportar Dados',
  },
  auditoriaExportar: {
    nome: 'auditoriaExportar',
    descricao: 'Auditoria - Exportar Dados',
  },
  modoDev: {
    nome: 'modoDev',
    descricao: 'Modo Desevolvedor (Avançado)',
  },
  cfgNegociosListar: {
    nome: 'cfgNegociosListar',
    descricao: 'Variáveis Ambiente',
  },
  cfgNegociosAlterar: {
    nome: 'cfgNegociosAlterar',
    descricao: 'Variáveis Ambiente',
  },
  cfgTecnicasListar: {
    nome: 'cfgTecnicasListar',
    descricao: 'Variáveis Ambiente',
  },
  cfgTecnicasAlterar: {
    nome: 'cfgTecnicasAlterar',
    descricao: 'Variáveis Ambiente',
  },
  deviceIdVisualizar: {
    nome: 'deviceIdVisualizar',
    descricao: 'Visualiza informação de DeviceID do Usuário',
  },
};

export enum enumListaTipoSicredi {
  cosifs = '/cosifs',
  estadosCivis = '/estados-civis',
  grausInstrucao = '/graus-instrucao',
  nacionalidades = '/nacionalidades',
  orgaosEmissores = '/orgaos-emissores',
  profissoes = '/profissoes',
  ocupacoes = '/ocupacoes',
  ramosAtividade = '/ramos-atividade',
  tiposDocIdentidade = '/tipos-doc-identidade',
  tiposResidencia = '/tipos-residencia',
  tiposTelefone = '/tipos-telefone',
}

export const enumVariavel = {
  situacaoFiscal: {
    ordem: 0,
    origem: 'PH3A',
    nome: 'PH3A-Situação Fiscal',
    tipoComparacao: ['validacao', 'prop'],
  },
  unicoFacematch: {
    ordem: 2,
    origem: 'Unico',
    nome: 'Unico-FaceMatch',
    tipoComparacao: ['validacao', 'prop'],
  },
  unicoLiveness: {
    ordem: 3,
    origem: 'Unico',
    nome: 'Unico-Liveness',
    tipoComparacao: ['validacao', 'prop'],
  },
  unicoOCR: {
    ordem: 4,
    origem: 'Unico',
    nome: 'Unico-OCR',
    tipoComparacao: ['validacao', 'prop'],
  },
  unicoScore: {
    ordem: 5,
    origem: 'Unico',
    nome: 'Unico-Score',
    tipoComparacao: ['validacao', 'prop'],
  },
  unicoBiometry: {
    ordem: 6,
    origem: 'Unico',
    nome: 'Unico-Biometry',
    tipoComparacao: ['validacao', 'prop'],
  },
  unicoStatus: {
    ordem: 7,
    origem: 'Unico',
    nome: 'Unico-Status',
    tipoComparacao: ['validacao', 'prop'],
  },
  cidadeFronteira: {
    ordem: 8,
    origem: 'Cadastro Próprio',
    nome: 'Cidades de Fronteira',
    tipoComparacao: ['lista'],
  },
  ufRisco: {
    ordem: 9,
    origem: 'Cadastro Próprio',
    nome: 'UF de Risco',
    tipoComparacao: ['lista'],
    listaExigeReferencia: true,
  },
  cidadeRisco: {
    ordem: 10,
    origem: 'Cadastro Próprio',
    nome: 'Cidade de Risco',
    tipoComparacao: ['lista'],
    listaExigeReferencia: true,
  },
  pep: {
    ordem: 11,
    origem: 'Advice',
    nome: 'Advice-Pep',
    tipoComparacao: ['validacao', 'lista'],
  },
  listaRestritiva: {
    ordem: 12,
    origem: 'Advice',
    nome: 'Advice-ListaRestritiva',
    tipoComparacao: ['validacao', 'prop'],
  },
  midiaNegativa: {
    ordem: 13,
    origem: 'Advice',
    nome: 'Advice-MidiaNegativa',
    tipoComparacao: ['validacao', 'prop'],
  },
  profissaoRisco: {
    ordem: 14,
    origem: 'Cadastro Próprio',
    nome: 'Profissão de Risco',
    tipoComparacao: ['lista'],
    listaExigeReferencia: true,
  },
  ocupacaoRisco: {
    ordem: 15,
    origem: 'Cadastro Próprio',
    nome: 'Ocupacao Sem Comp. Renda',
    tipoComparacao: ['lista'],
  },
  listaBacen: {
    ordem: 16,
    origem: 'Lydians',
    nome: 'Lydians-ListaBacen',
    tipoComparacao: ['validacao', 'lista'],
  },
  bloqueioSicred: {
    ordem: 17,
    origem: 'Sicred',
    nome: 'Sicred-BloqueioSicred',
    tipoComparacao: ['validacao', 'lista'],
    listaExigeReferencia: true,
  },
  somaPontos: {
    ordem: 18,
    origem: 'Classificação',
    nome: 'Classificação-SomaPontos',
    tipoComparacao: ['prop'],
  },
  dddRisco: {
    ordem: 19,
    origem: 'Cadastro Próprio',
    nome: 'DDD de Risco',
    tipoComparacao: ['lista'],
    listaExigeReferencia: true,
  },
  dddMatch: {
    ordem: 20,
    origem: 'DDD Match',
    nome: 'Verificação DDD - UF',
    tipoComparacao: ['lista'],
    listaExigeReferencia: true,
  },
  contadorContasAbertas: {
    ordem: 21,
    origem: 'Dados Contas Abertas',
    nome: 'Contador Contas Abertas',
    tipoComparacao: ['validacao', 'prop'],
  },
  contadorProcessos: {
    ordem: 22,
    origem: 'Dados Processos Abertura',
    nome: 'Contador Processos Abertura',
    tipoComparacao: ['validacao', 'prop'],
  },
  contadorBiometria: {
    ordem: 23,
    origem: 'Dados Biometria',
    nome: 'Contador Biometria',
    tipoComparacao: ['validacao', 'prop'],
  },
};

export const enumTipoTeste = {
  igual: {
    nome: 'Igual a',
    tipoComparacao: 'prop',
  },
  maior: {
    nome: 'Maior que',
    tipoComparacao: 'prop',
  },
  menor: {
    nome: 'Menor que',
    tipoComparacao: 'prop',
  },
  maiorIgual: {
    nome: 'Maior ou igual que',
    tipoComparacao: 'prop',
  },
  menorIgual: {
    nome: 'Menor ou igual que',
    tipoComparacao: 'prop',
  },
  diferente: {
    nome: 'Diferente',
    tipoComparacao: 'prop',
  },
  validoNao: {
    nome: 'Integração Não Realizada',
    tipoComparacao: 'validacao',
  },
  validoSim: {
    nome: 'Integração Realizada',
    tipoComparacao: 'validacao',
  },
  listaSim: {
    nome: 'Está em lista',
    tipoComparacao: 'lista',
  },
  listaNao: {
    nome: 'Não está em lista',
    tipoComparacao: 'lista',
  },
};

export enum enumCadastroBasico {
  cidadeFronteira = 'cidadeFronteira',
  ufRisco = 'ufRisco',
  cidadeRisco = 'cidadeRisco',
  ocupacaoRisco = 'ocupacaoRisco',
  profissaoRisco = 'profissaoRisco',
  dddRisco = 'dddRisco',
}

export const enumRisco = {
  baixo: { ordem: 0, nome: 'Baixo' },
  medio: { ordem: 1, nome: 'Médio' },
  alto: { ordem: 2, nome: 'Alto' },
};

export const enumRecomendacao = {
  analisar: { ordem: 0, nome: 'Analisar' },
  impedir: { ordem: 1, nome: 'Impedir' },
};

export const enumMapTipoValidacaoContaNova = {
  impedimentoInicial: {
    calculoApenasCPF: true,
    recomendacao: {
      impedir: 'cadastroInapto',
    },
  },
  aprovacaoCadastro: {
    calculoApenasCPF: false,
    recomendacao: {
      impedir: 'cadastroReprovado',
      analisar: 'pendenteAprovacao',
    },
    risco: {
      baixo: 'cadastroAprovado',
      medio: 'cadastroAprovado',
      alto: 'cadastroAprovado',
    },
  },
};

export enum FormatoArquivo {
  bin,
  base64,
}

export enum enumTpConta {
  CC = 'Conta Deposito e Pagamento',
  CS = 'Conta Salário',
  PG = 'Conta Pagamento',
  PP = 'Conta Poupança',
}

export enum enumTpOperacao {
  'Pagamento' = 1,
  'Saque' = 2,
  'Troco' = 3,
}

export enum enumTpAutenticacao {
  S = 'Autenticação por Senha',
  T = 'Autenticação por Token',
}

export enum enumTpTransacao {
  'Transferência Eletrônica Financeira Enviada' = 1,
  'Documento de Ordem de Crédito Enviado' = 3,
  'Transferência Eletrônica Disponível Enviada' = 5,
  'Transferência Eletrônica Instantânea Enviada' = 7,
  'Devolução de Transf. Eletrônica Instantânea Enviada' = 9,
  'Pagamento de Boleto (Outras IFs)' = 14,
  'Pagamento de Boleto (Própria IF)' = 15,
  'Pagamento de Boleto via SPB (Outras IFs)' = 16,
  'Pagamento de Boleto via Banco AB' = 17,
}

export enum enumCodCanal {
  'Agência/Pessoal' = 1,
  'Eletrônico/ATM/POS' = 2,
  'Correspondente no País' = 3,
  'Internet/HB' = 4,
  'Mobile/APP' = 5,
  'Call Center' = 6,
}

export enum enumStatsOwnerEvento {
  SETTLEMENTS = 1,
  REPORTED_FRAUDS = 2,
  CONFIRMED_FRAUDS = 3,
  REJECTED = 4,
}

export enum enumStatsOwnerEventoDesc {
  'Transações realizadas(SETTLEMENTS)' = 1,
  'Relatos de infrações (REPORTED_FRAUDS)' = 2,
  'Relatos de infrações com análise e concordância do creditado (CONFIRMED_FRAUDS)' = 3,
  'Relatos de infrações com análise e discondância do creditado (REJECTED)' = 4,
}

export enum enumMEDResultAnalise {
  'Totalmente aceito' = 1,
  'Parcialmente aceito' = 2,
}

export enum enumCodModalidade {
  'TEF' = 1,
  'DOC' = 2,
  'TED' = 3,
  'PIX' = 4,
  'Cartão' = 5,
  'Boleto' = 6,
  'Convênios' = 7,
  'Tributos federais' = 8,
  'Investimento' = 9,
  'Registro de Boletos' = 10,
}

export enum enumTpIniciacao {
  'Favorecido cadastrado' = 1,
  'Favorecido não cadastrado' = 2,
  'Chave PIX cadastrada' = 3,
  'Chave PIX não cadastrada' = 4,
  'QR Code PIX' = 5,
  'Compra no Cartão' = 6,
  'Saque no Cartão' = 7,
  'Devolução de PIX' = 8,
  'Boleto Intrabancário - Própria IF' = 11,
  'Boleto Intrabancário - Outras IFs' = 12,
  'Boleto Superior SPB - Outras IFs' = 13,
  'Cobrança de Boleto' = 14,
  'Depósito em Conta por Boleto' = 15,
  'QR Code PIX (Saque e Troco)' = 16,
  'Todas as formas' = 9,
}

export const enumContaNovaUnicoStatus = {
  aguardando: {
    cod: 1,
    descricao: 'Aguardando documentos, execução ou processamento',
  },
  emDivergencia: { cod: 2, descricao: 'Em divergência' },
  concluido: { cod: 3, descricao: 'Concluído' },
  cancelado: { cod: 4, descricao: 'Cancelado' },
  erro: { cod: 5, descricao: 'Erro' },
  enviandoMensagem: { cod: 6, descricao: 'Enviando mensagem' },
  aguardandoMensagem: { cod: 7, descricao: 'Aguardando captura da mensagem' },
  reenviandoMensagem: { cod: 8, descricao: 'Reenviando mensagem' },
};

export const enumComunicacao = {
  todos: { nome: 'todos ' },
  naoEnviaErro: { nome: 'naoEnviaErro' },
  erroSemMudarStatus: { nome: 'erroSemMudarStatus' },
};

export const enumAnalises = {
  gruposUsuario: 'gruposUsuario',
  gruposOutros: 'gruposOutros',
  semAnalise: 'semAnalise',
};

// SortEnums

export const enumSortUsers = {
  ativo_asc: 'u.BIT_INATIVO ASC',
  ativo_desc: 'u.BIT_INATIVO DESC',
  nome_asc: 'u.DS_NOME ASC',
  nome_desc: 'u.DS_NOME DESC',
  email_asc: 'u.DS_EMAIL ASC',
  email_desc: 'u.DS_EMAIL DESC',
  ultimo_acesso_asc: 'u.DT_ULTIMO_ACESSO ASC',
  ultimo_acesso_desc: 'u.DT_ULTIMO_ACESSO DESC',
  modificado_em_asc: 'u.DT_MODIFICADO_EM ASC',
  modificado_em_desc: 'u.DT_MODIFICADO_EM DESC',
};

export const enumSortRisks = {
  ativo_asc: 'ruc.BIT_ATIVO ASC',
  ativo_desc: 'ruc.BIT_ATIVO DESC',
  nome_asc: 'ruc.DS_NOME ASC',
  nome_desc: 'ruc.DS_NOME DESC',
  variavel_asc: 'ruc.DS_VARIAVEL ASC',
  variavel_desc: 'ruc.DS_VARIAVEL DESC',
};

export const enumSortGroups = {
  nome_asc: 'g.DS_NOME ASC',
  nome_desc: 'g.DS_NOME DESC',
  numero_usuarios_asc: 'COUNT(ug.INT_USUARIO_ID) ASC',
  numero_usuarios_desc: 'COUNT(ug.INT_USUARIO_ID) DESC',
  analise_processos_asc: `CASE WHEN g.CL_TAGS LIKE '%analiseAberturaConta%' THEN 0 ELSE 1 END ASC`,
  analise_processos_desc: `CASE WHEN g.CL_TAGS LIKE '%analiseAberturaConta%' THEN 0 ELSE 1 END DESC`,
};

export const enumSortAudits = {
  criado_em_asc: 'ap.DT_CRIADO_EM ASC',
  criado_em_desc: 'ap.DT_CRIADO_EM DESC',
  acao_asc: 'ap.DS_ACAO ASC',
  acao_desc: 'ap.DS_ACAO DESC',
  responsavel_asc: 'ap.DS_RESPONSAVEL_NOME ASC',
  responsavel_desc: 'ap.DS_RESPONSAVEL_NOME DESC',
  cliente_asc: 'ap.DS_NOME ASC',
  cliente_desc: 'ap.DS_NOME DESC',
};

export const enumSortAccounts = {
  risco_asc: 'ruc.DS_CLASSIFICACAO ASC',
  risco_desc: 'ruc.DS_CLASSIFICACAO DESC',
  nome_asc: 'uc.DS_NOME_REGISTRO ASC',
  nome_desc: 'uc.DS_NOME_REGISTRO DESC',
  criado_em_asc: 'uc.DT_CRIADO_EM ASC',
  criado_em_desc: 'uc.DT_CRIADO_EM DESC',
  modificado_em_asc: 'uc.DT_MODIFICADO_EM ASC',
  modificado_em_desc: 'uc.DT_MODIFICADO_EM DESC',
};

export const enumSortProcesses = {
  risco_asc: 'ruc.DS_CLASSIFICACAO ASC',
  risco_desc: 'ruc.DS_CLASSIFICACAO DESC',
  nome_asc: 'cn.DS_NOME ASC',
  nome_desc: 'cn.DS_NOME DESC',
  cpf_asc: 'cn.DS_CPF_CNPJ ASC',
  cpf_desc: 'cn.DS_CPF_CNPJ DESC',
  status_asc: 'cn.DS_STATUS ASC',
  status_desc: 'cn.DS_STATUS DESC',
  criado_em_asc: 'cn.DT_CRIADO_EM ASC',
  criado_em_desc: 'cn.DT_CRIADO_EM DESC',
  modificado_em_asc: 'cn.DT_MODIFICADO_EM ASC',
  modificado_em_desc: 'cn.DT_MODIFICADO_EM DESC',
};

export const enumSortFAQCategories = {
  nome_asc: 'fc.DS_NOME ASC',
  nome_desc: 'fc.DS_NOME DESC',
  descricao_asc: 'fc.DS_DESCRICAO ASC',
  descricao_desc: 'fc.DS_DESCRICAO DESC',
  funcionalidade_asc: 'fc.DS_FUNCIONALIDADE ASC',
  funcionalidade_desc: 'fc.DS_FUNCIONALIDADE DESC',
  criado_em_asc: 'fc.DT_CRIADO_EM ASC',
  criado_em_desc: 'fc.DT_CRIADO_EM DESC',
  modificado_em_asc: 'fc.DT_MODIFICADO_EM ASC',
  modificado_em_desc: 'fc.DT_MODIFICADO_EM DESC',
};

export const enumUpdateAccount = {
  nome: {
    update: 'DS_NOME_REGISTRO',
    newValue: 'New_Nome_Social',
    oldValue: 'Old_Nome_Social',
  },
  celular: {
    update: 'DS_CELULAR',
    newValue: 'New_Numero_Celular',
    oldValue: 'Old_Numero_Celular',
  },
  email: {
    update: 'DS_EMAIL',
    newValue: 'New_Email',
    oldValue: 'Old_Email',
  },
};
