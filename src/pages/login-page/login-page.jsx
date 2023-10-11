import React, { useState, useContext} from "react";
import logo  from "../../assets/logo.png"
import ButtonLogin from "../../atoms/button-login/button-login"
import "./login-page.css"
import { AuthContext } from "../../contexts/auth";
import {Link} from "react-router-dom"


function LoginPage () {
    const {authenticated, login} = useContext(AuthContext);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", {email, password});
        login(email, password);
        
    }



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
                            onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        
                        <div className="field">
                            <input className="input_login" 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Senha" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className="action">
                            <ButtonLogin text="Entrar"/>
                            <Link to="/signup">
                                <button className="button_create">
                                    Criar Conta
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
