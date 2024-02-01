import React, { useState } from "react";
import Button from "../../atoms/button/button";
import { useNavigate } from "react-router-dom";
import FieldInput from "../../atoms/field-input/field-input";
import {
  Container,
  ContainerSignup,
  FormContainer,
  ActionContainer,
  LinkButton,
  ErrorMessage,
} from "./styles";
import { i18n } from "../../../translate/i18n";

const BoxSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setsenha] = useState("");
  const [confirmsenha, setConfirmsenha] = useState("");
  const [error, setError] = useState("");

  function validationsenha(senha) {
    const uppercase = /[A-Z]/;
    const number = /\d/;
    const specialCharacter = /[!@#\\$_%^&*]/;

    return (
      uppercase.test(senha) &&
      number.test(senha) &&
      specialCharacter.test(senha)
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmsenha) {
      setError(i18n.t("signup.passwords_dont_match"));
      return;
    }

    if (!validationsenha(senha)) {
      setError(i18n.t("signup.password_invalid"));
      return;
    }

    const userData = {
      email: email,
      usuario: usuario,
      senha: senha,
      nome: nome,
    };

    fetch("http://localhost:8000/usuario", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok || !data.status) {
          throw new Error(data.mensagem.texto);
        }

        console.log("Usuário cadastrado com sucesso:", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error.message);
        setError(error.message);
      });
  };

  return (
    <Container>
      <ContainerSignup>
        <FormContainer onSubmit={handleSubmit}>
          <FieldInput
            type="email"
            placeholder={i18n.t("signup.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FieldInput
            type="usuario"
            placeholder={i18n.t("signup.user")}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <FieldInput
            type="nome"
            placeholder={i18n.t("signup.name")}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <FieldInput
            type="password"
            placeholder={i18n.t("signup.password")}
            value={senha}
            onChange={(e) => setsenha(e.target.value)}
          />

          <FieldInput
            type="password"
            placeholder={i18n.t("signup.confirm_password")}
            value={confirmsenha}
            onChange={(e) => setConfirmsenha(e.target.value)}
          />

          <ErrorMessage $show={error !== ""}>{error}</ErrorMessage>

          <ActionContainer>
            <Button
              $border="1px solid #808080"
              $backgroundColor="black"
              color="#00acee"
              $text={i18n.t("signup.create_account")}
            />

            <LinkButton to="/login">
              <Button border="1px solid white" $text={i18n.t("signup.back")} />
            </LinkButton>
          </ActionContainer>
        </FormContainer>
      </ContainerSignup>
    </Container>
  );
};

export default BoxSignup;
