export interface loginData {
    email: string;
    senha: string;
}

export interface loginResponse {
    token: string;
    expire_date: string;
}