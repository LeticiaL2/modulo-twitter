import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TweetInput from "../../components/molecules/tweet-input-box/tweet-input-box";
import ListTweets from "../../components/organism/list-tweets/list-tweets";
import perfil from "../../assets/perfil.png";
import { Container, BoxCenter } from "./styles";
import HeaderHome from "../../components/molecules/header-home/header-home";
import GlobalStyles from "../../styles/global-style";
import { AuthContext } from "../../contexts/auth";

function HomePage() {
  const { user } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [tweetsLoaded, setTweetsLoaded] = useState(false);

  useEffect(() => {
    if (tweetsLoaded) {
      fetchTweets();
    }
  }, [tweetsLoaded]);

  const addTweet = async (tweetObject) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const response = await axios.post(
        "http://localhost:8000/tweets",
        tweetObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTweetsLoaded(true);
      setTweets((prevTweets) => [response.data, ...prevTweets]);
    } catch (error) {
      console.error("Erro ao adicionar o tweet:", error);
    }
  };

  const fetchTweets = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const response = await axios.get("http://localhost:8000/tweets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTweets(response.data);
    } catch (error) {
      console.error("erro ao buscar tweets:", error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Container>
      <GlobalStyles />
      <BoxCenter>
        <HeaderHome />
        <TweetInput
          buttonText="Post"
          placeholder="What is happening?!"
          src={perfil}
          nome={user.nome}
          usuario={user.usuario}
          comentarios={0}
          retweets={0}
          likes={0}
          onTweet={addTweet}
        />
        <ListTweets tweets={tweets} fetchTweets={fetchTweets} />
      </BoxCenter>
    </Container>
  );
}

export default HomePage;
