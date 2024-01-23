import React, { createContext, useState, useEffect } from "react";
import { get, post } from "../api/api";

export const TweetsListContext = createContext();

const TimeLineProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);

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

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <TweetsListContext.Provider
      value={{ refreshTweets: getTweets, addTweet, tweets }}
    >
      {children}
    </TweetsListContext.Provider>
  );
};

export default TimeLineProvider;
