import React, { useState, useContext} from "react";
import { AuthContext } from "../../../contexts/auth";
import Button from "../../atoms/button/button";
import FieldInput from "../../atoms/field-input/field-input"
import {Container} from "./styles"
import {ContainerLogin} from "./styles"
import {FormContainer} from "./styles"
import {ActionContainer} from "./styles"
import {LinkButton} from "./styles"



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
        <Container>
            <ContainerLogin>
                <FormContainer onSubmit={handleSubmit}>
                    
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

                    <ActionContainer>
                        <Button
                        $border="1px solid white"
                        $backgroundColor="black"
                        color="#00acee"
                        $text="Entrar"/>
                        <LinkButton to="/signup">
                            <Button $text="Criar Conta" />
                        </LinkButton>
                    </ActionContainer>
                </FormContainer>
            </ContainerLogin>
        </Container>
    )
}

export default BoxLogin;