import React, { useState } from "react";
import UserPhoto from "../../atoms/user-photo/user-photo";
import { FaRetweet } from "react-icons/fa";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import axios from "axios";
import Actions from "../../molecules/actions/actions";
import { useNavigate } from "react-router-dom";
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
  Reposted,
} from "./styles";

function TweetCard({ userData }) {
  const navigate = useNavigate();
  const { id, usuario, nome, texto, data, liked, retweeted } = userData;
  const [expanded, setExpanded] = useState(false);
  const charLimit = 140;

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  /* const handleButtonLike = async () => {
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
      props.fetchTweets();
    } catch (error) {
      console.error("Erro ao realizar a ação:", error);
    }
  };

  const handleButtonRetweet = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const isAlreadyRetweeted = props.retweeted;

      if (isAlreadyRetweeted) {
        // Se já retweetou, então desfaz o retweet
        if (tweetId) {
          const response = await axios.delete(
            `http://localhost:8000/tweets/${tweetId}/retweet`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Ação realizada com sucesso:", response.data);

          setRetweeted(false);
          setRetweetCount(retweetCount - 1);
          setTweetId(null);

          props.fetchTweets();
        } else {
          console.log("Erro: tweetId é nulo.");
        }
      } else {
        // Se não retweetou, faz o retweet
        const newTexto = props.newTexto || props.texto;

        const response = await axios.post(
          `http://localhost:8000/tweets/${props.id}/retweet`,
          { texto: newTexto },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Ação realizada com sucesso:", response.data);

        setRetweeted(true);
        setRetweetCount(retweetCount + 1);

        if (response.data.conteudo && response.data.conteudo.tweetId) {
          setTweetId(response.data.conteudo.tweetId);
        }

        props.fetchTweets();
      }
    } catch (error) {
      console.error("Erro ao realizar a ação:", error);
    }
  }; */

  const displaytexto =
    texto && texto.length > charLimit
      ? `${texto.slice(0, charLimit)}...`
      : texto;

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
    console.log("id tweet card", id);
    navigate(`/tweets/${id}/detalhes`);
  };

  console.log("data", userData);

  const timeAgo = formatTimeAgo(new Date(data));
  const isRetweet = !!userData.tweetPai;
  console.log("tweet card retweeted:", retweeted);

  return (
    <ContainerTweetCard>
      {isRetweet && !userData.texto && (
        <Reposted>
          {" "}
          <FaRetweet /> @{usuario} reposted
        </Reposted>
      )}
      <>
        <TopTweetCard>
          <UserPhoto />
          <NameProfile>{nome}</NameProfile>
          <User>
            {usuario} • {timeAgo}
          </User>
        </TopTweetCard>
        <ContentContainer>
          <ContentTweet onClick={handleTweetClick}>
            {texto ||
              (userData.tweetPai &&
                userData.tweetPai[0] &&
                userData.tweetPai[0].texto)}
            {texto && texto.length > charLimit && (
              <ShowMore onClick={handleToggleExpand}>
                {expanded ? "Mostrar Menos" : "Mostrar Mais"}
              </ShowMore>
            )}
          </ContentTweet>
        </ContentContainer>
        <FooterTweetCard>
          <Actions
            tweetId={userData.id}
            comentarios={userData.comentarios}
            likes={userData.likes}
            liked={userData.liked}
            retweets={userData.retweets}
            retweeted={userData.retweeted}
            tweetPaiUsuario={userData.usuario}
            texto={userData.texto}
          ></Actions>
        </FooterTweetCard>
      </>
    </ContainerTweetCard>
  );
}

export default TweetCard;
