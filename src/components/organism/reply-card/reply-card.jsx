import React from "react";
import {
  Container,
  TopTweetCard,
  NameProfile,
  User,
  ContentContainer,
  ContentTweet,
  FooterTweetCard,
} from "./styles";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import { formatTimeAgo } from "../../../utils/dateUtils";
import UserPhoto from "../../atoms/user-photo/user-photo";

const ReplyCard = ({ comentario }) => {
  const timeAgo = formatTimeAgo(new Date(comentario.data_criacao));

  return (
    <Container>
      <TopTweetCard>
        <UserPhoto />
        <NameProfile>{comentario.nome}</NameProfile>
        <User>
          {comentario.usuario} • {timeAgo}
        </User>
      </TopTweetCard>

      <ContentContainer>
        <ContentTweet>{comentario.texto}</ContentTweet>
      </ContentContainer>

      <FooterTweetCard>
        <ButtonIcon iconType="reply" count={comentario.comentarios} />
        <ButtonIcon iconType="retweet" count={comentario.retweets} />
        <ButtonIcon iconType="heart" count={comentario.likes} />
      </FooterTweetCard>
    </Container>
  );
};

export default ReplyCard;
