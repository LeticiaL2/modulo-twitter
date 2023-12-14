import axios from "axios";
// import { getUserLocalStorage } from "../contexts/util";

export const Api = axios.create({
  baseURL: "http://192.168.8.8:3001/",
})

// Api.interceptors.request.use(
//   config => {
//     const routesWithoutInterceptor = ["/api/v1/auth", "/api/v1/usuarios"]
//     if(!routesWithoutInterceptor.some(route => config.url.includes(route))){
//       const token = getUserLocalStorage().token // Substitua isso pela lógica de obtenção do token de autenticação
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//       }
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

export default Api