import React, { useState, useContext} from "react";
import logo  from "../../assets/logo.png"
import "./box-signup.css"
import {Link, Navigate} from "react-router-dom"
import Button from "../../atoms/button/button";
import ButtonSubmit from "../../atoms/button-submit/button-submit"
import { useNavigate } from "react-router-dom";


function BoxSignup(){

    const navigate= useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem. Por favor, verifique.");
            return;
          }
      
        const userData = {
          email: email,
          password: password
        };
      
        fetch("http://localhost:3001/users", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((user) => {
            console.log("Usuário cadastrado com sucesso:", user);
          });
          
          navigate("/login");
      };


    return(
        
        <div className="container_signup">
            <div className="box">
                <form className="form_container" onSubmit={handleSubmit}>
                    
                    <div className="field">
                        <input
                        className="input_signup"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <input
                        className="input_signup"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <input
                        className="input_signup"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirmar Senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="action">
                        <ButtonSubmit text="Criar Conta"/>
                        <Link className="link" to="/login">
                            <Button text="Voltar"/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default BoxSignup;