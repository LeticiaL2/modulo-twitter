import style from "./style.module.scss";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import InputDisabled from "../../atoms/InputDisabled";
import React from "react";
import useLogin from "../../../hooks/useLogin";
import PopUpError from "../../atoms/PopUpError";

interface Props {
  showPopup?: boolean;
  handleClose?: () => void;
  value: string;
}

export default function PopupSenha({ showPopup, handleClose, value }: Props) {
  const { mutate, isError } = useLogin();
  const [inputValue, setInputValue] = React.useState("");
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const submit = async () => {
    const data = {
      email: value,
      senha: inputValue,
    };
    mutate(data);
  };

  return (
    <div className={showPopup ? style.DivMain : style.PopupHidden}>
      <div className={style.DivContainer}>
        <div className={style.DivIcons}>
          <div onClick={handleClose}>
            <img src="./images/close.svg" alt="Botão de fechar" />
          </div>
          <div>
            <img src="./images/logo.svg" alt="Logo X" />
          </div>
          <div></div>
        </div>
        <div className={style.Div}>
          <h1>Digite sua senha</h1>
          <InputDisabled email={value} />
          <Input
            type={"text"}
            text={"Senha"}
            onInputChange={handleInputChange}
          />
          <div>
            <Button
              name={"Entrar"}
              backgroundWhite={true}
              link={"home"}
              onClick={submit}
            />
          </div>
          <p className={style.DivLink}>
            Não tem uma conta? <a href="">Inscreva-se</a>
          </p>
          {isError && <PopUpError />}
        </div>
      </div>
    </div>
  );
}
