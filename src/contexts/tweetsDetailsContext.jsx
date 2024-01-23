import React, { createContext, useState, useEffect } from "react";
import { get, post } from "../api/api";
import { useParams } from "react-router-dom";

export const TweetsDetailsContext = createContext();

const TweetsDetailsProvider = ({ children }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [tweet, setTweet] = useState(null);
  const { id } = useParams();

  const getTweets = async () => {
    console.log("id aqui", id);
    try {
      const response = await get(`tweets/${id}/detalhes`);

      console.log("Dados da API:", response);
      console.log("comentarios", response.conteudo.comentariosArray);
      setCommentsList(response.conteudo.comentariosArray);
      setTweet(response.conteudo);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  const addTweet = async (tweetObject) => {
    try {
      const response = await post(`tweets/${id}/comentarios`, tweetObject);
      console.log("Resposta da API após o POST:", response);
      setCommentsList((prevList) => [...prevList, response.conteudo]);

      getTweets();
    } catch (error) {
      console.error("Erro ao realizar o POST na API:", error);
    }
  };

  useEffect(() => {
    getTweets();
  }, [id]);

  return (
    <TweetsDetailsContext.Provider
      value={{ refreshTweets: getTweets, addTweet, commentsList, tweet }}
    >
      {children}
    </TweetsDetailsContext.Provider>
  );
};

export default TweetsDetailsProvider;
