import style from "./style.module.scss";

interface Props {
  email?: Text;
}

export default function InputDisabled({ email }: Props) {
  return (
    <div className={style.DivMain}>
      <p>E-mail</p>
      <p>heloise.katharine@l2code.com.br</p>
    </div>
  );
}
