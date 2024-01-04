import style from "./style.module.scss";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import InputDisabled from "../../atoms/InputDisabled";

interface Props {
  showPopup?: boolean;
  handleClose?: () => void;
}

export default function PopupSenha({ showPopup, handleClose }: Props) {

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
          <InputDisabled/>
          <Input />
          <Button name={"Entrar"} backgroundWhite={true} />
          <p>
            Não tem uma conta? <a href="">Inscreva-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}
