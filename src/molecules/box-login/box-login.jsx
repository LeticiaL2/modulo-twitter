import React, { useState, useContext} from "react";
import ButtonSubmit from "../../atoms/button-submit/button-submit"
import "./box-login.css"
import { AuthContext } from "../../contexts/auth";
import Button from "../../atoms/button/button";
import {Link} from "react-router-dom"
import FieldInput from "../../atoms/field-input/field-input"


function BoxLogin() {
    
    const {login} = useContext(AuthContext);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", {email, password});
        login(email, password);
        
    }
    
    return(
        <div className="container">
            <div className="login_container">
                <form className="form_container" onSubmit={handleSubmit}>
                    
                        <FieldInput 
                        type="email" 
                        placeholder="Email" 
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}/>
                    
                        <FieldInput
                        type="password"  
                        placeholder="Senha" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <div id="error-container" className="erro_message"></div>

                    <div className="action">
                        <ButtonSubmit text="Entrar"/>
                        <Link className="link" to="/signup">
                            <Button text="Criar conta"/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BoxLogin;