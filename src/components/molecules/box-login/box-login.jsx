import React, { useState, useContext} from "react";
import { AuthContext } from "../../../contexts/auth";
import Button from "../../atoms/button/button";
import FieldInput from "../../atoms/field-input/field-input"
import {LinkButton, ErrorMessage, Container, ContainerLogin, FormContainer, ActionContainer} from "./styles"



function BoxLogin() {
    
    const {login} = useContext(AuthContext);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          console.log("submit", { email, password });
          await login(email, password);
        } catch (err) {
          setError("Credenciais inválidas"); 
        }
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

                <ErrorMessage show={error !== ''}>{error}</ErrorMessage> 

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