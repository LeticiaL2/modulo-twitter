import React, {createContext, useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate= useNavigate();
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('token');
    
        if (recoveredUser) {
            try {
                const parsedUser = JSON.parse(recoveredUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Erro ao fazer o parse do usuário do localStorage:", error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    
    const login = async (email, password) => {
        console.log("login auth", { email, password });
    
        const response = await fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
    
        if (response.status === 200) {
            const data = await response.json();
            const { accessToken, user: loggedUser } = data;
    
            localStorage.setItem('user', JSON.stringify(loggedUser));
            localStorage.setItem('token', JSON.stringify(accessToken));
    
            await fetch("http://localhost:3001/users", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
    
            setUser(loggedUser);
            navigate("/");
        } else {
            // Exibir mensagem de erro
            const errorContainer = document.getElementById("error-container");
            errorContainer.textContent = "Credenciais inválidas";
            errorContainer.style.display = "block";
        }
    };
    
    

    const logout = async() => {

        console.log("logout");
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        await fetch('http://localhost:3001/users', {
                method: 'GET',
                headers: {
                    Authorization: null,
                },
        });
        
        setUser(null);
        navigate("/login");
    };

    return(
        <AuthContext.Provider value={{authenticated:!!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
