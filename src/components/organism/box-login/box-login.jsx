import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/auth";
import Button from "../../atoms/button/button";
import FieldInput from "../../atoms/field-input/field-input";
import {
  LinkButton,
  ErrorMessage,
  Container,
  ContainerLogin,
  FormContainer,
  ActionContainer,
} from "./styles";
import { i18n } from "../../../translate/i18n";

function BoxLogin() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("submit", { email, password });
      await login(email, password);
    } catch (err) {
      console.log(err);

      setError(err.message);
    }
  };

  return (
    <Container>
      <ContainerLogin>
        <FormContainer onSubmit={handleSubmit}>
          <FieldInput
            type="email"
            placeholder={i18n.t("login.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FieldInput
            type="password"
            placeholder={i18n.t("login.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ErrorMessage $show={error !== ""}>{error}</ErrorMessage>

          <ActionContainer>
            <Button
              $border="1px solid white"
              $backgroundColor="black"
              color="#00acee"
              $text={i18n.t("login.enter")}
            />
            <LinkButton to="/signup">
              <Button $text={i18n.t("login.create_account")} />
            </LinkButton>
          </ActionContainer>
        </FormContainer>
      </ContainerLogin>
    </Container>
  );
}

export default BoxLogin;
