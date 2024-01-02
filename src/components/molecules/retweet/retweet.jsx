import React, { useState } from "react";
import UserPhoto from "../../atoms/user-photo/user-photo";
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

const Retweet = ({ tweetPai }) => {
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

  function formatTimeAgo(data) {
    const now = new Date();
    const secondsAgo = Math.floor((now - data) / 1000);
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
          return data.toLocaleDateString(undefined, options);
        }
      }
    }
  }

  const handleTweetClick = () => {
    console.log("id tweet card", tweetPai.id);
    navigate(`/tweets/${tweetPai.id}/detalhes`);
  };

  const timeAgo = formatTimeAgo(new Date(tweetPai.data));

  return (
    <Container>
      <ContainerTweetCard>
        <TopTweetCard>
          <UserPhoto />
          <NameProfile>{tweetPai.nome}</NameProfile>
          <User>
            {tweetPai.usuario} • {timeAgo}
          </User>
        </TopTweetCard>
        <ContentContainer>
          <ContentTweet onClick={handleTweetClick}>
            {tweetPai.texto}
          </ContentTweet>
        </ContentContainer>
      </ContainerTweetCard>
    </Container>
  );
};

export default Retweet;
