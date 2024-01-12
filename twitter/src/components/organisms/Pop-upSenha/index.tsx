import style from "./style.module.scss";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import InputDisabled from "../../atoms/InputDisabled";
import React, { useEffect } from "react";
import LinkButton from "../../atoms/LinkButton";
import useLogin from "../../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import PopUpError from "../../atoms/PopUpError";

interface Props {
  showPopup?: boolean;
  handleClose?: () => void;
  value: string;
  // value: (value:string) => void;
}

export default function PopupSenha({ showPopup, handleClose, value }: Props) {
  console.log("========== Value input 3 ==========", value);
  // const [users, setUsers] = useState<any[]>([]);

  // const getUsers = async () => {
  //   await api.get("/usuarios?limite=2&pagina=1&ordenar='usuario'&ordenarPor=DESC").then((resp: { data: SetStateAction<any[]>; }) => setUsers(resp.data));
  // };

  // const {data, isFetching} = useQuery('login', async () => {
  //   const response = await axios.get('http://localhost/3006//usuarios?limite=2&pagina=1&ordenar="usuario"&ordenarPor=DESC')

  //   return response.data;
  // });

  // console.log("************ data = ", data);

  const navigate = useNavigate();
  const { mutate, isSuccess, isError } = useLogin();
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChangeInApp = (value: string) => {
    setInputValue(value);
  };

  // const toast = useToast();

  const submit = async () => {
    const data = {
      // email: "email@gmail.com",
      // senha: "Senha123*",
      email: value,
      senha: inputValue,
      
    };
    console.log("Entrou ?");
    mutate(data);
  };

  useEffect(() => {
    console.log("Fechar!!");

    if (isSuccess === true) {
      console.log(" isSuccess = ", isSuccess);
      return navigate("home");
    }
    // if (isError) {
    //   <PopUpError/>
    // }
  }, [isSuccess]);

  return (
    <div className={showPopup ? style.DivMain : style.PopupHidden}>
      <div className={style.DivContainer}>
        <div className={style.DivIcons}>
          <div onClick={handleClose}>
            <img src="./images/close.svg" alt="Botão de fechar" />
          </div>
          <div>
            <img src="./images/logo.svg" alt="Logo X" />
          </div>
          <div></div>
        </div>
        <div className={style.Div}>
          <h1>Digite sua senha</h1>
          <InputDisabled email={value} />
          <Input text={"Senha"} onInputChange={handleInputChangeInApp} />
          <div>
            <Button
              name={"Entrar"}
              backgroundWhite={true}
              link={"home"}
              onClick={submit}
            />
            {/* <LinkButton
              onClick={submit}
              name={"Entrar 2"}
              backgroundWhite={true}
              link={"home"}
            /> */}
          </div>
          <p className={style.DivLink}>
            Não tem uma conta? <a href="">Inscreva-se</a>
          </p>
          {isError && <PopUpError/>}
        </div>
      </div>
    </div>
  );
}
