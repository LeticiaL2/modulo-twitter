import React, { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const recoveredToken = localStorage.getItem("accessToken");

    if (recoveredToken) {
      console.log("token recovered", recoveredToken);
      try {
        const parsedUser = JSON.parse(recoveredToken);
        setUser(parsedUser);
        setToken(recoveredToken);
      } catch (error) {
        console.error(
          "Erro ao fazer o parse do usuário do localStorage:",
          error
        );
        localStorage.removeItem("accessToken");
        <Navigate to="/login" />;
      }
    }
  }, []);

  const login = async (email, password) => {
    console.log("login auth", { email, password });

    const response = await fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 401) {
      const data = await response.json();
      throw new Error(data.message);
    }

    if (response.status === 200) {
      const data = await response.json();
      const { acessToken } = data.conteudo;

      const payload = {
        token: data.conteudo.acessToken,
        usuario: data.conteudo.usuario,
        name: data.conteudo.nome,
      };

      setUser(payload);

      localStorage.setItem("user", JSON.stringify(payload));
      localStorage.setItem("accessToken", JSON.stringify(acessToken));

      setToken(acessToken);

      console.log("token recebido", acessToken);

      <Navigate to="/" />;
    }
  };

  const logout = async () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    setUser(null);
    <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
