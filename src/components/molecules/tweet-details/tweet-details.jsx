import React, { useState, useEffect } from "react";
import axios from "axios";
import ptBR from "date-fns/locale/pt-BR";
import { useLocation, useParams } from "react-router-dom";
import {
  TweetDetailsContainer,
  TopTweet,
  TopTweetLeft,
  TopTweetRight,
  NameProfile,
  User,
  ContentContainer,
  TweetDate,
  ContentTweet,
  FooterTweetCard,
} from "./styles";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import UserPhoto from "../../atoms/user-photo/user-photo";
import Button from "../../atoms/button/button";
import { format } from "date-fns";
import { get, post } from "../../../api/api";
import Actions from "../actions/actions";

const TweetDetails = () => {
  const { id } = useParams();
  const [postTweet, setPostTweet] = useState({});
  const getTweets = async () => {
    console.log("id aqui", id);
    try {
      const response = await get(`tweets/${id}/detalhes`);

      console.log("Dados da API:", response);
      console.log("tweet detalhes aqui", response.conteudo);
      setPostTweet(response.conteudo);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    getTweets();
  }, [id]);

  /* const handleButtonClick = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.post(
        `http://localhost:8000/tweets/${tweetInfo.id}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Ação realizada com sucesso:", response.data);

      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
      props.fetchTweets();
    } catch (error) {
      console.error("Erro ao realizar a ação:", error);
    }
  }; */

  function formatTimeAgo(date) {
    try {
      if (date && !isNaN(date.getTime())) {
        const formattedDateTime = format(date, "HH:mm · dd, MMM yyyy", {
          locale: ptBR,
        });
        return `${formattedDateTime}`;
      } else {
        return "Data inválida";
      }
    } catch (error) {
      console.error("Erro ao formatar a data:", error);
      return "Data inválida";
    }
  }
  const timeAgo = formatTimeAgo(new Date(postTweet.data));

  return (
    <TweetDetailsContainer>
      <TopTweet>
        <TopTweetLeft>
          <UserPhoto />
          <NameProfile>{postTweet.nome}</NameProfile>
          <User>{postTweet.usuario}</User>
        </TopTweetLeft>
        <TopTweetRight>
          <Button
            $border="2px solid black"
            $backgroundColor="white"
            $color="black"
            $text="Seguir"
          />
          <ButtonIcon iconType="option" $padding="10px" />
        </TopTweetRight>
      </TopTweet>

      <ContentContainer>
        <ContentTweet>{postTweet.texto}</ContentTweet>

        <TweetDate>{timeAgo}</TweetDate>
      </ContentContainer>

      <FooterTweetCard>
        <Actions
          tweetId={postTweet.id}
          comentarios={postTweet.comentarios}
          likes={postTweet.likes}
          liked={postTweet.liked}
          retweets={postTweet.retweets}
          retweeted={postTweet.retweeted}
        ></Actions>
      </FooterTweetCard>
    </TweetDetailsContainer>
  );
};

export default TweetDetails;
