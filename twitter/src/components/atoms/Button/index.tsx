import style from "./style.module.scss";

interface Props {
  id?: string;
  name: string;
  colorblue?: boolean;
  backgroundWhite?: boolean;
  textWhite?: boolean;
  widthFull?: boolean;
  link?: string;
  onClick?: () => void;
}

function MenuButton({
  name,
  colorblue,
  backgroundWhite,
  textWhite,
  onClick,
}: Props) {
  return (
    <div onClick={onClick} className={style.Main}>
      <div
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
        <span className={style.Text}>{name}</span>
      </div>
    </div>
  );
}

export default MenuButton;
