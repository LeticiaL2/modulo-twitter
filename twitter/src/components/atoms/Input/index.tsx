import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";

/*interface Props{
  removeEvent?: boolean;
}*/
export default function Input() {
  const [showInputFocus, setInputFocus] = useState(false);

  const handleClick = () => {
    setInputFocus(true);
  };

  const handleClose = () => {
    setInputFocus(false);
  };

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ClickForaDiv = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as HTMLDivElement)
      ) {
        //console.log("Clicou fora do input!");
        handleClose();
      } /*else {
         console.log("Clicou dentro do input!");
      }*/
    };

    document.addEventListener("click", ClickForaDiv);

    return () => {
      document.removeEventListener("click", ClickForaDiv);
    };
  }, []);

  return (
    <div
      ref={inputRef}
      className={showInputFocus ? style.DivInputFocus : style.DivInput}
    >
      <p id="p">Celular, e-mail ou nome de usuário</p>
      <input
        type="text"
        placeholder="Celular, e-mail ou nome de usuário"
        onClick={handleClick}
      />
    </div>
  );
}
