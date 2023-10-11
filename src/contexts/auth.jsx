import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await fetch('http://localhost:3004/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    const { accessToken, user: loggedUser } = data

    localStorage.setItem('user', JSON.stringify(loggedUser))
    localStorage.setItem('token', JSON.stringify(accessToken))

    await fetch('http://localhost:3004/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    setUser(loggedUser)
    navigate('/')

  }

  const logout = async () => {
    setUser(null)

    localStorage.removeItem('user')
    localStorage.removeItem('token')

    await fetch('http://localhost:3004/users', {
      method: 'GET',
      headers: {
        'Authorization': null
      }
    })
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
