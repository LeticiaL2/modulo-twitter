import style from "./style.module.scss";
import LoginButton from "../../components/atoms/LoginButton";
import Button from "../../components/atoms/Button";
import PopupEntrar from "../../components/organisms/Pop-upEntrar";
import { useState } from "react";

export default function Login() {
  const arraybutton = [
    { name: "Inscrever-se com Apple", img: "./images/logo_apple.svg" },
    { name: "Entrar com a conta do Google", img: "./images/logo_apple.svg" },
  ];

  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true); // Abre o popup ao clicar no botão
  };
  const handleClose = () => {
    setShowPopup(false); // Fecha o popup ao clicar no botão
  };

  return (
    <>
      <div className={style.DivMain}>
        <div className={style.DivMainLogo}>
          <div className={style.DivLogo}>
            <img src="./images/logo_login.svg" alt="Logo X" />
          </div>
        </div>
        <div className={style.DivMainTitle}>
          <div className={style.DivTitle}>
            <h1 className={style.Title}>Acontecendo agora</h1>
            <p className={style.SubTitle}>Inscreva-se hoje</p>
            {arraybutton.map((item, index) => (
              <LoginButton key={index} name={item.name} img={item.img} />
            ))}
            <div className={style.MainLine}>
              <div className={style.Line}></div> ou
              <div className={style.Line}></div>
            </div>

            <div className={style.buttonSize}>
              <Button name={"Criar conta"} colorblue={true} />
            </div>
            <div className={style.MainTermos}>
              <p className={style.Termos}>
                Ao se inscrever, você concorda com os{" "}
                <a href="https://twitter.com/pt/tos">Termos de Serviço</a> e a{" "}
                <a href="https://twitter.com/pt/privacy">
                  Política de Privacidade
                </a>
                , incluindo o{" "}
                <a href="https://help.twitter.com/pt/rules-and-policies/x-cookies">
                  Uso de Cookies
                </a>
                .
              </p>
            </div>

            <div className={style.MainTextEntrar}>
              <p>Já tem uma conta?</p>
            </div>

            <div className={style.buttonSize}>
            <Button name={"Entrar"} colorblue={false} onClick={handleClick} />
            </div>
            <PopupEntrar isShowPopup={showPopup} handleClose={handleClose} />
          </div>
        </div>
      </div>
      <div className={style.DivLinks}>
        <a href="https://about.twitter.com/pt">Sobre</a>
        <a href="https://help.twitter.com/en/using-x/download-the-x-app">
          Baixe o aplicativo do X
        </a>
        <a href="https://help.twitter.com/pt">Central de Ajuda</a>
        <a href="https://twitter.com/pt/tos"> Termos de Serviço</a>
        <a href="https://twitter.com/pt/privacy">Política de Privacidade</a>
        <a href="https://help.twitter.com/pt/rules-and-policies/x-cookies">
          Política de cookies
        </a>
        <a href="https://help.twitter.com/pt/resources/accessibility">
          Acessibilidade
        </a>
        <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo">
          Informações de anúncios
        </a>
        <a href="https://blog.twitter.com/">Blog</a>
        <a href="https://status.twitterstat.us/">Status</a>
        <a href="https://careers.twitter.com/en">Carreiras</a>
        <a href="https://about.twitter.com/pt/company/brand-resources">
          Recursos da marca
        </a>
        <a href="https://business.twitter.com/pt/advertising.html?ref=gl-tw-tw-twitter-advertise">
          Publicidade
        </a>
        <a href="https://marketing.twitter.com/pt">Marketing</a>
        <a href="https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness">
          X para Empresas
        </a>
        <a href="https://developer.twitter.com/en">Desenvolvedores</a>
        <a href="https://twitter.com/i/directory/profiles">Diretório</a>
        <a href="https://twitter.com/settings/account/personalization">
          Configurações
        </a>
        <a href="">© 2023 X Corp.</a>
      </div>
    </>
  );
}
