export interface loginData {
  email: string;
  senha: string;
}

export interface loginResponse {
  token: string;
  expire_date: string;
}

export interface criarContaData {
  nome: string;
  usuario: string;
  email: string;
  senha: string;
}
