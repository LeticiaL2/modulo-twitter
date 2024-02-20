import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { criarContaData } from "../interfaces/loginData";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000";

const postData = async (data: criarContaData) => {
  return await axios.post(baseURL + "/usuarios", data);
};

export default function useCriarConta() {
  const navigate = useNavigate();

  function handleCriarContaSuccess() {
    return navigate("home");
  }

  function handleCriarContaError() {
    console.log("Erro!");
  }

  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries(["twitter-data"]);
      handleCriarContaSuccess();
    },
    onError: () => {
      handleCriarContaError();
    },
  });

  return mutate;
}
