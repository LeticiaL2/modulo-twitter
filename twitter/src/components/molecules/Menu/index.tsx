import { useEffect, useState } from "react";
import MenuButton from "../../atoms/MenuButton";
import style from "./style.module.scss";

function Menu() {
  const arraybutton = [
    { name: "Home", link: "", img: "./images/home.svg", show: "true" },
    { name: "Explorar", link: "", img: "./images/lupa.svg", show: "true" },
    {
      name: "Notificações",
      link: "",
      img: "./images/notificacao.svg",
      show: "true",
    },
    { name: "Messages", link: "", img: "./images/mensagem.svg", show: "true" },
    { name: "Listas", link: "", img: "./images/listas.svg", show: "true" },
    {
      name: "Favoritos",
      link: "",
      img: "./images/favoritos.svg",
      show: "false",
    },
    {
      name: "Comunidades",
      link: "",
      img: "./images/comunidades.svg",
      show: "false",
    },
    { name: "Prêmio", link: "", img: "./images/logo.svg", show: "true" },
    { name: "Perfil", link: "", img: "./images/perfil.svg", show: "true" },
    { name: "Mais", link: "", img: "./images/mais.svg", show: "true" },
  ];

  const [alturaPag, setlAturaPag] = useState(window.innerHeight);

  useEffect(() => {
    const teste = () => setlAturaPag(window.innerHeight);

    window.addEventListener("resize", teste);

    return () => window.removeEventListener("resize", teste);
  }, [alturaPag]);

  console.log("Altura da página 2: " + alturaPag);

  return (
    <div className={style.Menu}>
      <div className={style.Logo}>
        <img src="./images/logo.svg" alt="Logo" />
      </div>
      {arraybutton.map((item, index) =>
        alturaPag <= 660 && item.show === "true" ? (
          <MenuButton key={index} name={item.name} img={item.img} />
        ) : alturaPag >= 660 ? (
          <MenuButton key={index} name={item.name} img={item.img} />
        ) : null
      )}
    </div>
  );
}

export default Menu;
