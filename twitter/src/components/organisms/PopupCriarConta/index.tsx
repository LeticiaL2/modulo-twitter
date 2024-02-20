import style from "./style.module.scss";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { useState } from "react";
import useCriarConta from "../../../hooks/useCriarConta";
import { z } from "zod";

interface Props {
  isShowPopup: boolean;
  handleClose: () => void;
}
interface ValidationObject {
  message: string;
  path: string[];
}

export default function PopupCriarConta({ isShowPopup, handleClose }: Props) {
  const { mutate } = useCriarConta();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleInputChangeEmail = (value: string) => {
    setEmail(value);
  };
  const handleInputChangePassword = (value: string) => {
    setPassword(value);
  };
  const handleInputChangeName = (value: string) => {
    setName(value);
  };
  const handleInputChangeUser = (value: string) => {
    setUser(value);
  };
  const handleEmailInputError = () => {
    setErrorEmail(true);
  };
  const handleEmailInputSuccess = () => {
    setErrorEmail(false);
  };
  const handleNameInputError = () => {
    setErrorName(true);
  };
  const handleNameInputSuccess = () => {
    setErrorName(false);
  };
  const handlePasswordInputSuccess = () => {
    setErrorPassword(false);
  };
  const handlePasswordInputError = () => {
    setErrorPassword(true);
  };
  const handleUserInputSuccess = () => {
    setErrorUser(false);
  };
  const handleUserInputError = () => {
    setErrorUser(true);
  };

  const handleClickEtapaDois = () => {
    const createUserFormSchema = z.object({
      name: z
        .string()
        .max(100, { message: "O nome deve ter menos de 100 caracteres." })
        .min(1, { message: "O nome é obrigatório." }),

      email: z
        .string({
          required_error: "O e-mail é obrigatório.",
          invalid_type_error: "O e-mail deve ser uma string.",
        })
        .email("Informe um endereço de e-mail válido.")
        .max(100, {
          message: "O endereço de e-mail deve ter menos de 100 caracteres.",
        }),
    });

    const data = {
      name: name,
      email: email,
    };

    const result = createUserFormSchema.safeParse(data);

    if (result.success) {
      setShowPopup(true);
    } else {
      const parsedData: ValidationObject[] = JSON.parse(result.error.message);

      parsedData.forEach((item) => {
        if (item.path[0] === "email") {
          handleEmailInputError();

          if (parsedData.length === 1) {
            handleNameInputSuccess();
          }
        } else if (item.path[0] === "name") {
          handleNameInputError();

          if (parsedData.length === 1) {
            handleEmailInputSuccess();
          }
        } else {
          handleEmailInputSuccess();
          handleNameInputSuccess();
        }
      });
    }
  };

  const handleClickSubmit = () => {
    const createUserFormSchema = z.object({
      user: z
        .string({ required_error: "O usuário é obrigatório." })
        .max(50, { message: "O usuário deve ter menos de 50 caracteres" })
        .min(1, { message: "O usuário é obrigatório." }),

      password: z
        .string({
          required_error: "A senha é obrigatória.",
          invalid_type_error: "A senha deve ser uma string.",
        })
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]*$/,
          {
            message:
              "A senha deve conter pelo menos 1 caractere minúsculo, 1 maiúsculo, 1 dígito e 1 símbolo.",
          }
        )
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
        .max(200, {
          message: "A senha deve ter no máximo 200 caracteres.",
        }),
    });

    const data = {
      user: user,
      password: password,
    };

    const result = createUserFormSchema.safeParse(data);

    if (result.success) {
      submit();
    } else {
      const parsedData: ValidationObject[] = JSON.parse(result.error.message);
      let count = 0;

      parsedData.forEach((item) => {
        if (item.path[0] === "password") {
          count = count + 1;

          handlePasswordInputError();

          if (parsedData.length === count) {
            handleUserInputSuccess();
          }
        } else if (item.path[0] === "user") {
          handleUserInputError();

          if (parsedData.length === 1) {
            handlePasswordInputSuccess();
          }
        } else {
          handlePasswordInputSuccess();
          handleUserInputSuccess();
        }
      });
      count = 0;
    }
  };

  const handleCloseEtapaDois = () => {
    setShowPopup(false);
  };

  const submit = async () => {
    const data = {
      nome: name,
      usuario: user,
      email: email,
      senha: password,
    };
    mutate(data);
  };

  return (
    <div className={isShowPopup ? style.DivMain : style.PopupHidden}>
      <div
        className={showPopup ? style.DivContainerHidden : style.DivContainer}
      >
        <div className={style.DivIcons}>
          <div onClick={handleClose}>
            <img src="./images/close.svg" alt="Botão de fechar" />
          </div>

          <div>
            <p>Etapa 1 de 2</p>
          </div>
        </div>
        <div className={style.Div}>
          <h1>Criar sua conta</h1>

          <Input
            text={"Nome"}
            type={"text"}
            error={errorName}
            onInputChange={handleInputChangeName}
          />

          <Input
            text={"E-mail"}
            type={"email"}
            error={errorEmail}
            onInputChange={handleInputChangeEmail}
          />

          <Button
            name={"Avançar"}
            backgroundWhite={true}
            onClick={handleClickEtapaDois}
          />
        </div>
      </div>

      <div
        className={showPopup ? style.DivContainer : style.DivContainerHidden}
      >
        <div className={style.DivIcons}>
          <div onClick={handleCloseEtapaDois}>
            <img src="./images/seta.svg" alt="Botão de voltar" />
          </div>

          <div>
            <p>Etapa 2 de 2</p>
          </div>
        </div>
        <div className={style.Div}>
          <h1>Criar sua conta</h1>

          <Input
            text={"Usuário"}
            type={"text"}
            error={errorUser}
            onInputChange={handleInputChangeUser}
          />
          <Input
            text={"Senha"}
            type={"password"}
            error={errorPassword}
            onInputChange={handleInputChangePassword}
          />

          <p>
            <a href="">Usar o telefone</a>
          </p>

          <Button
            name={"Finalizar"}
            backgroundWhite={true}
            onClick={handleClickSubmit}
          />
        </div>
      </div>
    </div>
  );
}
