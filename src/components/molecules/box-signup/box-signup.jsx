import React, { useState} from "react";

import Button from "../../atoms/button/button";
import { useNavigate } from "react-router-dom";
import FieldInput from "../../atoms/field-input/field-input";
import {Container} from "./styles"
import {ContainerSignup} from "./styles"
import {FormContainer} from "./styles"
import {ActionContainer} from "./styles"
import {LinkButton} from "./styles"


const BoxSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function validationPassword(password) {
    const uppercase = /[A-Z]/;
    const number = /\d/;
    const specialCharacter = /[!@#\\$_%^&*]/; 
  
    return (
      uppercase.test(password) &&
      number.test(password) &&
      specialCharacter.test(password)
    );
  }

  const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
          setError("As senhas não coincidem.");
          return;
        }

        if (!validationPassword(password)) {
          setError("A senha não atende aos criterios");
          return;
        }

        const userData = {
          email: email,
          password: password,
        };

        fetch("http://localhost:3001/users", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status === 400) {
              setError("Este email já foi cadastrado.");
              return;
            }
            return response.json();
          })
          .then((user) => {
            if (user) {
              console.log("Usuário cadastrado com sucesso:", user);
              navigate("/login");
            }
          });
      };

  return (
    <Container>
      <ContainerSignup>
        <FormContainer onSubmit={handleSubmit}>
          
            <FieldInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
       
            <FieldInput
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FieldInput
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

          

          <div className="error">{error}</div> 
          
          <ActionContainer>
            
            <Button  
            $border="1px solid #808080" 
            $backgroundColor="black"
            color="#00acee"
            $text="Avançar"/>

            <LinkButton to="/login">
              <Button 
              border= "1px solid white"
              $text="Voltar" />
            </LinkButton>


          </ActionContainer>
        </FormContainer>
      </ContainerSignup>
    </Container>
  );
};

export default BoxSignup;