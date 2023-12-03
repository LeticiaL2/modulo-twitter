import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
      }
    }
    setLoading(false);
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
      const { acessToken, user: loggedUser } = data.conteudo;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("accessToken", JSON.stringify(acessToken));

      setToken(acessToken);

      console.log("token recebido", acessToken);

      const meResponse = await fetch("http://localhost:8000/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      if (meResponse.ok) {
        const userData = await meResponse.json();
        setUser(userData);
        navigate("/");
      }
    }
  };

  /*const login = async (email, password) => {
    const response = await fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.mensagem.codigo === 201) {
      const { acessToken, user: loggedUser } = data.conteudo;

      console.log("Token recebido:", acessToken);

      localStorage.setItem("accessToken", acessToken);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      setToken(acessToken);
      setUser(loggedUser);

      // Navegue para a página desejada
      navigate("/");
    } else {
      console.error("Erro ao realizar o login:", data.mensagem.mensagem);

      // Atualize o estado de erro
      const errorContainer = document.getElementById("error-container");
      errorContainer.textContent = "Credenciais inválidas";
      errorContainer.style.display = "block";

      // Você pode querer lançar um novo erro aqui ou tomar medidas adicionais com base no erro recebido
    }
  };*/

  const logout = async () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
