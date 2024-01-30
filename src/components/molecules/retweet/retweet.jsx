import React, { useState } from "react";
import UserPhoto from "../../atoms/user-photo/user-photo";
import { formatTimeAgo } from "../../../utils/dateUtils";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ContainerTweetCard,
  TopTweetCard,
  ContentContainer,
  NameProfile,
  User,
  ContentTweet,
  ShowMore,
} from "./styles";

const Retweet = ({ tweet }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const charLimit = 140;

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  /*const displaytexto =
    texto && texto.length > charLimit
      ? `${texto.slice(0, charLimit)}...`
      : texto;*/

  const handleTweetClick = () => {
    navigate(`/tweets/${tweet.id}/detalhes`);
  };

  const timeAgo = formatTimeAgo(new Date(tweet.data));

  return (
    <Container>
      <ContainerTweetCard>
        <TopTweetCard>
          <UserPhoto />
          <NameProfile>{tweet.nome}</NameProfile>
          <User>
            {tweet.usuario} • {timeAgo}
          </User>
        </TopTweetCard>
        <ContentContainer>
          <ContentTweet onClick={handleTweetClick}>{tweet.texto}</ContentTweet>
        </ContentContainer>
      </ContainerTweetCard>
    </Container>
  );
};

export default Retweet;
