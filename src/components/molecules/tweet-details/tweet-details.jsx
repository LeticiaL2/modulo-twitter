import React, { useState, useEffect, useContext } from "react";
import perfil from "../../../assets/perfil.png";
import axios from "axios";
import { AuthContext } from "../../../contexts/auth";
import { useLocation } from "react-router-dom";
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

const TweetDetails = (props) => {
  const location = useLocation();
  const tweetInfo = (location.state && location.state.tweetInfo) || {};
  console.log("tweetInfo:", tweetInfo);

  const [expanded, setExpanded] = useState(false);
  const charLimit = 140;
  const { texto } = props;
  const [liked, setLiked] = useState(tweetInfo.liked);
  const [likesCount, setLikesCount] = useState(tweetInfo.likes);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleTweetClick = (e) => {
    if (expanded) {
      e.preventDefault();
    }
  };

  const handleButtonClick = async () => {
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

      // Atualiza o estado local para refletir a mudança de curtida
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Erro ao realizar a ação:", error);
    }
  };

  const displaytexto =
    texto && texto.length > charLimit
      ? `${texto.slice(0, charLimit)}...`
      : texto;

  function formatTimeAgo(date) {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    if (secondsAgo < 60) {
      return `${secondsAgo}s`;
    } else {
      const minutesAgo = Math.floor(secondsAgo / 60);
      if (minutesAgo < 60) {
        return `${minutesAgo}m`;
      } else {
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
          return `${hoursAgo}h`;
        } else {
          const options = { day: "numeric", month: "short" };
          return date.toLocaleDateString(undefined, options);
        }
      }
    }
  }

  const timeAgo = formatTimeAgo(new Date(tweetInfo.date));

  /*   let formattedDate = "";

  if (tweetInfo.date && !isNaN(new Date(tweetInfo.date).getTime())) {
    formattedDate = format(new Date(tweetInfo.date), "HH:mm • MMM, yyyy");
  } else {
    console.error("Invalid date value:", tweetInfo.date);
    formattedDate = "Invalid Date";
  }

  console.log("formattedDate:", formattedDate);*/

  return (
    <TweetDetailsContainer>
      <TopTweet>
        <TopTweetLeft>
          <UserPhoto />
          <NameProfile>{tweetInfo.nome}</NameProfile>
          <User>{tweetInfo.usuario}</User>
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
        <ContentTweet>{tweetInfo.texto}</ContentTweet>

        <TweetDate>{timeAgo}</TweetDate>
      </ContentContainer>

      <FooterTweetCard>
        <ButtonIcon iconType="reply" count={tweetInfo.comentarios} />
        <ButtonIcon iconType="retweet" count={tweetInfo.retweets} />
        <ButtonIcon
          iconType={liked ? "heart-filled" : "heart"}
          count={likesCount}
          onClick={handleButtonClick}
          $color={liked ? "red" : undefined}
        />
      </FooterTweetCard>
    </TweetDetailsContainer>
  );
};

export default TweetDetails;
