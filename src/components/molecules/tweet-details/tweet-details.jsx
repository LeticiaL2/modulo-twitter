import React, { useState } from "react";
import axios from "axios";
import ptBR from "date-fns/locale/pt-BR";
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

  const [liked, setLiked] = useState(tweetInfo.liked);
  const [likesCount, setLikesCount] = useState(tweetInfo.likes);

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

      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Erro ao realizar a ação:", error);
    }
  };

  function formatTimeAgo(date) {
    const formattedDateTime = format(date, "HH:mm · dd, MMM  yyyy", {
      locale: ptBR,
    });
    return `${formattedDateTime}`;
  }

  const timeAgo = formatTimeAgo(new Date(tweetInfo.date));

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
