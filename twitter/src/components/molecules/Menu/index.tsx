import MenuButton from "../../atoms/MenuButton";
import style from "./style.module.scss";

function Menu() {
  const arraybutton = [
    { name: "Home", link: "", img: "./images/home.svg" },
    { name: "Explorar", link: "", img: "./images/lupa.svg" },
    { name: "Notificações", link: "", img: "./images/notificacao.svg" },
    { name: "Messages", link: "", img: "./images/mensagem.svg" },
    { name: "Listas", link: "", img: "./images/listas.svg" },
    { name: "Favoritos", link: "", img: "./images/favoritos.svg" },
    { name: "Comunidades", link: "", img: "./images/comunidades.svg" },
    { name: "Prêmio", link: "", img: "./images/logo.svg" },
    { name: "Perfil", link: "", img: "./images/perfil.svg" },
    { name: "Mais", link: "", img: "./images/mais.svg" },
  ];

  return (
    <div className={style.Menu}>
      <div className={style.Logo}>
        <img src="./images/logo.svg" alt="Logo" />
      </div>
      {arraybutton.map((item, index) => (
        <MenuButton key={index} name={item.name} img={item.img} />
      ))}
    </div>
  );
}

export default Menu;
