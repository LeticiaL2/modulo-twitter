import style from "./style.module.scss";

interface Props {
  name: string;
}

function MenuButton({ name }: Props) {

  return (
    <div
      className={style.MainButton}
    >
      <div className={style.Button}>
        <span className={style.Text}>{name}</span>
      </div>
    </div>
  );
}

export default MenuButton;
