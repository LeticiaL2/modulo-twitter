import { QueryClient, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { loginData } from "../interfaces/loginData";
import PopUpError from "../components/atoms/PopUpError";
import { useState } from "react";

const baseURL = "http://localhost:3000";

const postData = async (data: loginData) => {
  return await axios.post(baseURL + "/autenticacao/entrar", data);
};

export default function useLogin() {
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries(["twitter-data"]);
    },
    onError: () => {},
  });

  return mutate;
}
