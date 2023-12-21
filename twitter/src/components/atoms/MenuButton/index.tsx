import { useState } from "react";
import style from "./style.module.scss";

interface Props {
  name: string;
  img: string;
}

function MenuButton({ name, img }: Props) {
  const [buttonMain, setbuttonMain] = useState(false);

  return (
    <div
      className={style.MainButton}
      onMouseEnter={() => setbuttonMain(true)}
      onMouseLeave={() => setbuttonMain(false)}
    >
      <div className={style.Button}>
        {/*<div className={buttonMain ? 'style.active' : 'style.Button'} >*/}
        <img className={style.ImgButton} src={img} alt="Home" />
        <span className={style.Text}>{name}</span>
      </div>
    </div>
  );
}

export default MenuButton;
