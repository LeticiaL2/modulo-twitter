import style from "./style.module.scss";

interface Props {
  email?: string;
}

export default function InputDisabled({ email }: Props) {
  return (
    <div className={style.DivMain}>
      <p>E-mail</p>
      <p>{email}</p>
    </div>
  );
}
