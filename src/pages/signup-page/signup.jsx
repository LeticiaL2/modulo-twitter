import React, { useState, useContext} from "react";
import logo  from "../../assets/logo.png"
import "./signup.css"
import {Link} from "react-router-dom"



function SignupPage () {

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
      };


    return (
        <div className="login_page">
            <div className="header">
                <img className="logoX" src={logo} alt="" />
            </div>
            
            <div className="central">
                <div className="title_container">
                    <h1 className="title">Acontecendo agora</h1>
                </div>
                <div className="login_container">
                    <form className="form_container" onSubmit={handleSubmit}>
                        

                        <div className="field">
                            <input
                            className="input_login"
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
                            className="input_login"
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
                            className="input_login"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirmar Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="action">
                            <button type="submit" className="button_create">
                                Criar Conta
                            </button>
                            <div className="container_button_blue">
                                <Link to="/login">
                                    <button className="button_create">
                                        Voltar
                                    </button>
                                </Link>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;