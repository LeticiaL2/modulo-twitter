import { useState } from "react";
import style from "./style.module.scss";

interface Props {
  name: string;
  img: string;
}

function MenuButton({ name, img }: Props) {
  return (
    <div className={style.MainButton}>
      <div className={style.Button}>
        <img className={style.ImgButton} src={img} alt="" />
        <span className={style.Text}>{name}</span>
      </div>
    </div>
  );
}

export default MenuButton;
