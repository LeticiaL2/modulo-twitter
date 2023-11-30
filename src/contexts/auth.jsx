import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from './util';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = getUserLocalStorage()

    if (recoveredUser) {
      setUser(recoveredUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
      const response = await LoginRequest(email, password)
      if (!response.status) {
        return response
      }
      const payload = { token: response.conteudo.token, usuario: response.conteudo.usuario, name: response.conteudo.nome }
      setUser(payload)
      setUserLocalStorage(payload)

      return response
  };

  const logout = async () => {
    setUser(null);
    setUserLocalStorage(null)

    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
