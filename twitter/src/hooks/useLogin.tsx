import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { loginData } from "../interfaces/loginData";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000";

const postData = async (data: loginData) => {
  return await axios.post(baseURL + "/autenticacao/entrar", data);
};

export default function useLogin() {
  const navigate = useNavigate();

  function handleLoginSuccess() {
    return navigate("home");
  }

  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries(["twitter-data"]);
      handleLoginSuccess();
    },
    onError: () => {},
  });

  return mutate;
}
