import style from "./style.module.scss";

interface Props{
  email?: Text;
}

export default function InputDisabled({email}:Props) {

  return (
    <div className={style.DivInputFocus}>
      <input type="text" placeholder="Celular, e-mail ou nome de usuário" />
      <div>
        <p>E-mail</p>
        <p>Teste</p>
      </div>
    </div>
  );
}
