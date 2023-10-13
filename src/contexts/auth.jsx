import React, {createContext, useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate= useNavigate();
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('token')

        if(recoveredUser){
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false)
    }, [])

    
    const login = async (email, password) => {
        console.log("login auth", { email, password });

        const reponse = await fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const data = await reponse.json()
        const {accessToken, user: loggedUser} = data
        
        localStorage.setItem('user', JSON.stringify(loggedUser))
        localStorage.setItem('token', JSON.stringify(accessToken))

        await fetch("http://localhost:3001/users", {
            method: "GET",
            headers: {
                'Authorization':'Bearer ${accessToken}'
            }
        })

        setUser(loggedUser)
        navigate("/")
    }
    
    

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return(
        <AuthContext.Provider value={{authenticated:!!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
