import { useEffect, useState } from "react";
import style from "./style.module.scss";

export default function PopUpError() {
  const [start, setStart] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(() => {
      if (isMounted) {
        setStart(false);
      }
    }, 2000); // 2 segundos

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return start ? (
    <div className={style.Main}>
      <p className={style.Text}>Credenciais inválidas.</p>
    </div>
  ) : null;
}
