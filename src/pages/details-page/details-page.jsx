import React, { useState, useEffect, useContext, useCallback } from "react";
import "./styles";
import TweetDetails from "../../components/molecules/tweet-details/tweet-details";
import { BoxCenter, Container } from "./styles";
import TweetInput from "../../components/molecules/tweet-input-box/tweet-input-box";
import perfil from "../../assets/perfil.png";
import { get, post } from "../../api/api";
import axios from "axios";
import { AuthContext } from "../../contexts/auth";
import { useParams } from "react-router-dom";
import ListComments from "../../components/molecules/list-comentarios/list-comentarios";
import HeaderHome from "../../components/molecules/header-home/header-home";
import ListTweets from "../../components/organism/list-tweets/list-tweets";

function DetailsPage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [commentsList, setCommentsList] = useState([]);

  const getTweets = async () => {
    console.log("id aqui", id);
    try {
      const response = await get(`tweets/${id}/detalhes`);

      console.log("Dados da API:", response);
      console.log("comentarios", response.conteudo.comentariosArray);
      setCommentsList(response.conteudo.comentariosArray);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    getTweets();
  }, [id]);

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
        <ListTweets tweets={commentsList} />
      </BoxCenter>
    </Container>
  );
}

export default DetailsPage;
