import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";

interface Props{
  text: string;
}

export default function Input({text}:Props) {
  const [showInputFocus, setInputFocus] = useState(false);

  const handleClick = () => {
    setInputFocus(true);
  };

  const handleClose = () => {
    setInputFocus(false);
  };

  // const inputRef = useRef<HTMLDivElement>(null);
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
    <div
      className={showInputFocus ? style.DivInputFocus : style.DivInput}
    >
      <p id="p">{text}</p>
      <input
        type="text"
        ref={inputRef}
        placeholder={text}
        onClick={handleClick}
      />
      {/* <p>Esqueceu sua senha?</p> */}
    </div>
  );
}
