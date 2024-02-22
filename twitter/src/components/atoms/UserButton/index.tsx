import style from "./style.module.scss";

interface Props {
  name: string;
  user: string;
  img: string;
}

function UserButton({ name, user, img }: Props) {
  return (
    <div className={style.MainButton}>
      <div className={style.Div}>
        <img className={style.ImgButton} src={img} alt="Foto de perfil" />
        <div className={style.MainText}>
          <span className={style.TextName}>{name}</span>
          <span className={style.TextUser}>{"@" + user}</span>
        </div>
      </div>
      <img src={"./images/points.svg"} alt="" />
    </div>
  );
}

export default UserButton;
