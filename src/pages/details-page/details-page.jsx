import React, { useState, useEffect, useContext, useCallback } from "react";
import "./styles";
import TweetDetails from "../../components/molecules/tweet-details/tweet-details";
import { BoxCenter, Container } from "./styles";
import TweetInput from "../../components/molecules/tweet-input-box/tweet-input-box";
import perfil from "../../assets/perfil.png";
import axios from "axios";
import { AuthContext } from "../../contexts/auth";
import { useLocation } from "react-router-dom";
import ListComments from "../../components/molecules/list-comentarios/list-comentarios";
import HeaderHome from "../../components/molecules/header-home/header-home";

function DetailsPage() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const tweetInfo = (location.state && location.state.tweetInfo) || {};
  const [tweets, setTweets] = useState([]);

  const fetchTweets = useCallback(async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.get(
        `http://localhost:8000/tweets/${tweetInfo.id}/detalhes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "peguei os comentarios: ",
        response.data.conteudo.comentariosArray
      );
      setTweets(response.data.conteudo.comentariosArray);
    } catch (error) {
      console.error("Erro ao buscar tweets:", error);
    }
  }, [tweetInfo.id]);

  const addTweet = async (tweetObject) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      await axios.post(
        `http://localhost:8000/tweets/${tweetInfo.id}/comentarios`,
        tweetObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTweets();
    } catch (error) {
      console.error("Erro ao adicionar o tweet:", error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  return (
    <Container>
      <BoxCenter>
        <HeaderHome buttonText="Voltar" />
        <TweetDetails></TweetDetails>
        <TweetInput
          $border="none"
          buttonText="Reply"
          placeholder="Post your reply!"
          src={perfil}
          nome={user.nome}
          usuario={user.usuario}
          comentarios={0}
          retweets={0}
          likes={0}
          onTweet={addTweet}
        />
        <ListComments comentariosArray={tweets} fetchTweets={fetchTweets} />
      </BoxCenter>
    </Container>
  );
}

export default DetailsPage;
