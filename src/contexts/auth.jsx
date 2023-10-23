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
    console.log(response)
    const payload = { token: response.accessToken, id: response.user.id, name: response.user.name, username: response.user.username }


    setUser(payload)
    setUserLocalStorage(payload)
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
