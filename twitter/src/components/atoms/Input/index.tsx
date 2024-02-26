import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";

interface Props {
  text: string;
  onInputChange: (value: string) => void;
  error?: boolean;
  type?: string;
}

export default function Input({ text, type, error, onInputChange }: Props) {
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
    onInputChange(newValue);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ClickForaDiv = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as HTMLDivElement)
      ) {
        handleClose();
      } else {
      }
    };

    document.addEventListener("click", ClickForaDiv);

    return () => {
      document.removeEventListener("click", ClickForaDiv);
    };
  }, []);

  return (
    <div className={style.DivMain}>
      <div
        className={
          (showInputFocus ? style.DivInputFocus : style.DivInput) +
          (error ? ` ${style.DivInputError}` : "")
        }
      >
        <p id="pText">{text}</p>
        <input
          type={type}
          ref={inputRef}
          placeholder={text}
          onClick={handleClick}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
