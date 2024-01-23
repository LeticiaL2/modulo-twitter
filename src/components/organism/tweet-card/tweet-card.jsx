import React, { useState } from "react";
import UserPhoto from "../../atoms/user-photo/user-photo";
import { FaRetweet } from "react-icons/fa";
import axios from "axios";
import Actions from "../../molecules/actions/actions";
import Modal from "../../molecules/modal/modal";

import Retweet from "../../molecules/retweet/retweet";
import { useNavigate } from "react-router-dom";
import {
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

function TweetCard({ userData, refreshTweets, updatedTweets }) {
  const navigate = useNavigate();

  const tweet =
    userData.tweetPai && userData.texto === null ? userData.tweetPai : userData;

  const tweetPaidoPai =
    userData.tweetPai && userData.tweetPai ? userData.tweetPai : null;

  let tweetToRender = tweetPaidoPai;

  console.log("tweetTeste", tweetToRender);

  if (tweetToRender && tweetToRender.texto === null && tweetToRender.tweetPai) {
    let tweetPaiDoTweetPai = tweetToRender.tweetPai;
    console.log("tweetPaidoTweetPai", tweetPaiDoTweetPai);

    while (
      tweetPaiDoTweetPai &&
      tweetPaiDoTweetPai.texto === null &&
      tweetPaiDoTweetPai.tweetPai &&
      tweetPaiDoTweetPai.tweetPai
    ) {
      tweetPaiDoTweetPai = tweetPaiDoTweetPai.tweetPai;
    }

    if (tweetPaiDoTweetPai && tweetPaiDoTweetPai.texto !== null) {
      tweetToRender = tweetPaiDoTweetPai;
    }
  }

  console.log("tweet a ser renderizado:", tweetToRender);

  const {
    id,
    liked,
    retweeted,
    comentarios,
    likes,
    retweets,
    nome,
    usuario,
    texto,
    data,
  } = tweet;
  const [expanded, setExpanded] = useState(false);
  const charLimit = 140;

  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openRetweetModal, setOpenRetweetModal] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleLikeUpdate = () => {
    refreshTweets();
  };

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

  const handleUndoRetweet = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.delete(
        `http://localhost:8000/tweets/${userData.id}/delete`,
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

  /* const displaytexto =
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
    console.log("id tweet card", id);
    navigate(`/tweets/${id}/detalhes`);
  };

  const timeAgo = formatTimeAgo(new Date(data));
  const isRetweet = !!userData.tweetPai;
  console.log("userdata:", userData);
  console.log("tweet", tweet);

  return (
    <ContainerTweetCard>
      {isRetweet && !userData.texto && (
        <Reposted>
          {" "}
          <FaRetweet /> {userData.usuario} reposted
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
          {texto && tweet.tweetPai && (
            <Retweet texto={tweet.texto} tweetPai={tweetToRender} />
          )}
        </ContentContainer>
        <FooterTweetCard>
          <Actions
            onClickModal={() => setOpenCommentModal(true)}
            onClickRetweetModal={() => setOpenRetweetModal(true)}
            onClickCommentModal={() => setOpenCommentModal(true)}
            onClickUndoRetweet={handleUndoRetweet}
            onClickRetweet={handleButtonRetweet}
            onClickUpdateLike={handleLikeUpdate}
            tweetId={id}
            comentarios={comentarios}
            likes={likes}
            liked={liked}
            retweets={retweets}
            retweeted={retweeted}
            texto={texto}
            tweetPai={tweet.tweetPai && tweet.tweetPai[0]}
            tweet={userData}
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
      </>
    </ContainerTweetCard>
  );
}

export default TweetCard;
