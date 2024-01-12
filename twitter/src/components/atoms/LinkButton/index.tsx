import { Link, NavLink } from "react-router-dom";
import style from "./style.module.scss";

interface Props {
  id?: string;
  name: string;
  colorblue?: boolean;
  backgroundWhite?: boolean;
  textWhite?: boolean;
  widthFull?: boolean;
  link: string;
  onClick?: () => void;
}

function LinkButton({
  name,
  colorblue,
  backgroundWhite,
  textWhite,
  widthFull,
  onClick,
  link,
}: Props) {

  return (
    <button onClick= {onClick}>
    <Link
      to={link}
      className={
        colorblue
          ? style.MainButtonBlue
          : backgroundWhite
          ? style.MainButtonBackgroundWhite
          : textWhite
          ? style.MainButtontextWhite
          : style.MainButtonTransparent
      }
    >
      <div className={style.Button}>
        <span className={style.Text}>{name}</span>
      </div>
    </Link>
    </button>
  );
}

export default LinkButton;
