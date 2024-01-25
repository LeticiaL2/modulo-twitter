import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from './util';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const recoveredUser = getUserLocalStorage()

    if (recoveredUser) {
      setUser(recoveredUser);
    }
  }, []);

  const authenticate = async (email, password) => {
      const response = await LoginRequest(email, password)

      const payload = { token: response.conteudo.token, usuario: response.conteudo.usuario, name: response.conteudo.nome, expiresIn: response.conteudo.data_expiracao }
     
      setUser(payload)
      setUserLocalStorage(payload)
  };

  const logout = async () => {
    setUser(null);
    setUserLocalStorage(null)

    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
