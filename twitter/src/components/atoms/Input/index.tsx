import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";

interface Props {
  text: string;
  onInputChange: (value: string) => void;
  type?: string;
}

export default function Input({ text, type, onInputChange }: Props) {
  const [showInputFocus, setInputFocus] = useState(false);

  const handleClick = () => {
    setInputFocus(true);
  };

  const handleClose = () => {
    setInputFocus(false);
  };
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    // Chama a função de retorno fornecida pelo componente pai
    onInputChange(newValue);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ClickForaDiv = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as HTMLDivElement)
      ) {
        console.log("Clicou fora do input!");
        handleClose();
      } else {
        console.log("Clicou dentro do input!");
      }
    };

    document.addEventListener("click", ClickForaDiv);

    return () => {
      document.removeEventListener("click", ClickForaDiv);
    };
  }, []);

  return (
    <div className={style.DivMain}>
      <div className={showInputFocus ? style.DivInputFocus : style.DivInput}>
        <p id="pText">{text}</p>
        <input
          type={type}
          ref={inputRef}
          placeholder={text}
          onClick={handleClick}
          onChange={handleChange}
        />
      </div>
      {/* "text" */}
      {/* <p>Esqueceu sua senha?</p> */}
    </div>
  );
}
