import style from "./style.module.scss";

export default function Login() {
  return (
    <>
      <div className={style.DivMain}>
        <div className={style.DivLogo}>
          <img src="./images/logo_login.svg" alt="Logo X" />
        </div>
        <div className={style.DivMainTitle}>
        <div className={style.DivTitle}>
          <span className={style.Title}>Acontecendo agora</span>
          <p>Inscreva-se hoje</p>
          </div>
        </div>
      </div>
      <div className={style.DivLinks}>
        <a href="">Sobre</a>
        <a href="">Baixe o aplicativo do X</a>
        <a href="">Central de Ajuda</a>
        <a href=""> Termos de Serviço</a>
        <a href="">Política de Privacidade</a>
        <a href="">Política de cookies</a>
        <a href="">Acessibilidade</a>
        <a href="">Informações de anúncios</a>
        <a href="">Blog</a>
        <a href="">Status</a>
        <a href="">Carreiras</a>
        <a href="">Recursos da marca</a>
        <a href="">Publicidade</a>
        <a href="">Marketing</a>
        <a href="">X para Empresas</a>
        <a href="">Desenvolvedores</a>
        <a href="">Diretório</a>
        <a href="">Configurações</a>
        <a href="">© 2023 X Corp.</a>
      </div>
    </>
  );
}
