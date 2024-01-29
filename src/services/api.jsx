import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getUserLocalStorage } from '../contexts/util';

export const Api = axios.create({
  baseURL: "http://localhost:3001/",
})


function AxiosInterceptor({children}) {
  const navigate = useNavigate()
  const [isSet, setIsSet] = useState(false)

  useEffect(() => {

    const reqSuccessInterceptor = config => {
      const user = getUserLocalStorage()
      config.headers.Authorization = `Bearer ${user.token}`
      return config
    }

    const reqErrInterceptor = error => Promise.reject(error)

    const resSuccessInterceptor = response => response

    const resErrInterceptor = error => {

      if (error.response.status === 401) {
        navigate('/login')
      }

      return Promise.reject(error)
    }
    const reqInterceptor = Api.interceptors.request.use(reqSuccessInterceptor, reqErrInterceptor)
    const resInterceptor = Api.interceptors.response.use(resSuccessInterceptor, resErrInterceptor)
    setIsSet(true)

    return () => {
      Api.interceptors.response.eject(resInterceptor)
      Api.interceptors.request.eject(reqInterceptor)
    }

  }, [navigate])


  return isSet && children
}

export default Api
export { AxiosInterceptor }