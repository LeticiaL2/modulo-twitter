import React, { useState } from "react";
import UserPhoto from "../../atoms/user-photo/user-photo";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import axios from "axios";
import {
  LinkContainerTweet,
  ContainerTweetCard,
  TopTweetCard,
  ContentContainer,
  FooterTweetCard,
  NameProfile,
  User,
  ContentTweet,
  ShowMore,
} from "./styles";

function TweetCard(props) {
  const [expanded, setExpanded] = useState(false);
  const charLimit = 140;
  const { texto } = props;
  const [liked, setLiked] = useState(props.liked);
  const [likesCount, setLikesCount] = useState(props.likes);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleButtonClick = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.post(
        `http://localhost:8000/tweets/${props.id}/likes`,
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

  const timeAgo = formatTimeAgo(new Date(props.date));

  return (
    <ContainerTweetCard>
      <TopTweetCard>
        <UserPhoto />
        <NameProfile>{props.nome}</NameProfile>
        <User>
          {props.usuario} • {timeAgo}
        </User>
      </TopTweetCard>
      <ContentContainer>
        <LinkContainerTweet
          to={`/tweets/${props.id}/detalhes`}
          state={{ tweetInfo: props }}
          onClick={() => console.log("aaaaaaaa")}
        >
          <ContentTweet>
            {displaytexto}
            {texto && texto.length > charLimit && (
              <ShowMore onClick={handleToggleExpand}>
                {expanded ? "Mostrar Menos" : "Mostrar Mais"}
              </ShowMore>
            )}
          </ContentTweet>
        </LinkContainerTweet>
      </ContentContainer>
      <FooterTweetCard>
        <ButtonIcon iconType="reply" count={props.comentarios} />
        <ButtonIcon iconType="retweet" count={props.retweets} />
        <ButtonIcon
          iconType={liked ? "heart-filled" : "heart"}
          count={likesCount}
          onClick={handleButtonClick}
          $color={liked ? "red" : undefined}
        />
      </FooterTweetCard>
    </ContainerTweetCard>
  );
}

export default TweetCard;
