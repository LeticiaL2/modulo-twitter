import React, { useState, useEffect } from "react";
import axios from "axios";
import ptBR from "date-fns/locale/pt-BR";
import { useParams } from "react-router-dom";
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
import { get } from "../../../api/api";
import Actions from "../../molecules/actions/actions";
import Modal from "../../molecules/modal/modal";

const TweetDetails = ({ refreshTweets }) => {
  const { id } = useParams();
  const [tweet, setTweet] = useState({});
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openRetweetModal, setOpenRetweetModal] = useState(false);

  const getTweets = async () => {
    console.log("id aqui", id);
    try {
      const response = await get(`tweets/${id}/detalhes`);

      console.log("Dados da API:", response);
      console.log("tweet detalhes aqui", response.conteudo);
      setTweet(response.conteudo);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    getTweets();
  });

  const handleButtonRetweet = async () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const response = await axios.post(
      `http://localhost:8000/tweets/${id}/retweet`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    refreshTweets();

    console.log("Ação realizada com sucesso:", response.data);
  };

  const handleLikeUpdate = () => {
    refreshTweets();
  };

  const handleUndoRetweet = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.delete(
        `http://localhost:8000/tweets/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refreshTweets();
      console.log("Ação realizada com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao tentar desfazer retweet:", error);
    }
  };

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
  const timeAgo = formatTimeAgo(new Date(tweet.data));

  return (
    <TweetDetailsContainer>
      <TopTweet>
        <TopTweetLeft>
          <UserPhoto />
          <NameProfile>{tweet.nome}</NameProfile>
          <User>{tweet.usuario}</User>
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
        <ContentTweet>{tweet.texto}</ContentTweet>

        <TweetDate>{timeAgo}</TweetDate>
      </ContentContainer>

      <FooterTweetCard>
        <Actions
          tweetId={tweet.id}
          comentarios={tweet.comentarios}
          likes={tweet.likes}
          liked={tweet.liked}
          retweets={tweet.retweets}
          retweeted={tweet.retweeted}
          onClickModal={() => setOpenCommentModal(true)}
          onClickRetweetModal={() => setOpenRetweetModal(true)}
          onClickCommentModal={() => setOpenCommentModal(true)}
          onClickUndoRetweet={handleUndoRetweet}
          onClickRetweet={handleButtonRetweet}
          onClickUpdateLike={handleLikeUpdate}
        ></Actions>

        <Modal
          showModal={openRetweetModal}
          setShowModal={setOpenRetweetModal}
          userData={tweet}
          refreshTweets={refreshTweets}
        />

        <Modal
          showModal={openCommentModal}
          setShowModal={setOpenCommentModal}
          userData={tweet}
          isComment={true}
          refreshTweets={refreshTweets}
        />
      </FooterTweetCard>
    </TweetDetailsContainer>
  );
};

export default TweetDetails;
