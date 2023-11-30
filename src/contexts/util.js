import { Api } from "../services/api"

export function setUserLocalStorage(user) {
  localStorage.setItem("u", JSON.stringify(user))
}

export function getUserLocalStorage() {
  const user = localStorage.getItem("u")

  if (!user) return null

  const parsedUser = JSON.parse(user)

  return parsedUser ?? null
}

export const LoginRequest = async (email, password) => {
  try {
    const request = await Api.post("api/v1/auth", { email, senha: password })

    return request.data
  } catch (error) {
    return error.response.data
  }
}
