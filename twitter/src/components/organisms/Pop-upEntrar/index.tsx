import style from "./style.module.scss";
import LoginButton from "../../atoms/LoginButton";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { useState } from "react";
import PopupSenha from "../Pop-upSenha";


interface Props {
  isShowPopup: boolean,
  handleClose: () => void
}

export default function PopupEntrar({isShowPopup, handleClose }: Props) {
  const arraybutton = [
    { name: "Entrar com Google", img: "./images/logo_apple.svg" },
    { name: "Entrar com Apple", img: "./images/logo_apple.svg" },
  ];

  const [showPopupSenha, setShowPopupSenha] = useState(false);

  const handleClickPopupSenha = () => {
    setShowPopupSenha(true); // Abre o popup ao clicar no botão
  };
  const handleClosePopupSenha = () => {
    setShowPopupSenha(false); // Fecha o popup ao clicar no botão
  };

  return (
    <div className={isShowPopup ? style.DivMain : style.PopupHidden}>
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
          <h1>Entrar no X</h1>
          {arraybutton.map((item, index) => (
            <LoginButton key={index} name={item.name} img={item.img} />
          ))}
          <div className={style.MainLine}>
            <div className={style.Line}></div> ou
            <div className={style.Line}></div>
          </div>

          <Input text={"Celular, e-mail ou nome de usuário"}/>
          
          <Button name={"Avançar"} backgroundWhite={true} onClick={handleClickPopupSenha} />
          {/*<Button name={"Avançar"} backgroundWhite={true} onClick={() => {handleClickPopupSenha(); handleClose();}} /> */}
          <PopupSenha showPopup={showPopupSenha} handleClose={handleClosePopupSenha}/> 

          <Button name={"Esqueceu sua senha?"} textWhite={true} />

          <p>
            Não tem uma conta? <a href="">Inscreva-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}
