export interface UserPayload {
  sub: string
  usuario: string
  email: string
  nome: string
  iat?: number
  exp?: number
}
