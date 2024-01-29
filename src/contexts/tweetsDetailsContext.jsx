import React, { createContext, useState, useEffect, useCallback } from "react";
import { get, post } from "../api/api";
import { useParams } from "react-router-dom";

export const TweetsDetailsContext = createContext();

const TweetsDetailsProvider = ({ children }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [tweet, setTweet] = useState([]);
  const { id } = useParams();
  const [openCommentModal, setOpenCommentModal] = useState(null);
  const [openRetweetModal, setOpenRetweetModal] = useState(null);

  const getTweets = useCallback(async () => {
    try {
      const response = await get(`tweets/${id}/detalhes`);

      setCommentsList(response.conteudo.comentariosArray);
      setTweet(response.conteudo);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }, [id, tweet]);

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

  async function addReplyWithQuote(texto, id) {
    try {
      const response = await post(`tweets/${id}/retweet`, texto);
      setOpenRetweetModal(null);
      console.log("Resposta da requisição:", response.data);
      getTweets();
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
      console.log("Erro detalhado:", error.response);
    }
  }

  async function addComment(texto, id) {
    try {
      const response = await post(`tweets/${id}/comentarios`, texto);
      setOpenCommentModal(null);
      console.log("Resposta da requisição:", response.data);
      getTweets();
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
      console.log("Erro detalhado:", error.response);
    }
  }

  useEffect(() => {
    getTweets();
  }, [id, getTweets]);

  return (
    <TweetsDetailsContext.Provider
      value={{
        tweet,
        refreshTweets: getTweets,
        addTweet,
        commentsList,
        addReplyWithQuote,
        addComment,
        openCommentModal,
        setOpenCommentModal,
        openRetweetModal,
        setOpenRetweetModal,
      }}
    >
      {children}
    </TweetsDetailsContext.Provider>
  );
};

export default TweetsDetailsProvider;
