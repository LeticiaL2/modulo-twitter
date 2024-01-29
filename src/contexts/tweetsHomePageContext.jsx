import React, { createContext, useState, useEffect } from "react";
import { get, post } from "../api/api";

export const TweetsListContext = createContext();

const TimeLineProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [openCommentModal, setOpenCommentModal] = useState(null);
  const [openRetweetModal, setOpenRetweetModal] = useState(null);

  const getTweets = async () => {
    try {
      const response = await get("tweets");

      setTweets(response);
      console.log("Dados da API:", response);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  const addTweet = async (tweetObject) => {
    try {
      const response = await post("tweets", tweetObject);
      console.log("Resposta da API após o POST:", response);

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
  }, []);

  return (
    <TweetsListContext.Provider
      value={{
        refreshTweets: getTweets,
        addTweet,
        tweets,
        addComment,
        addReplyWithQuote,
        openCommentModal,
        setOpenCommentModal,
        openRetweetModal,
        setOpenRetweetModal,
      }}
    >
      {children}
    </TweetsListContext.Provider>
  );
};

export default TimeLineProvider;
