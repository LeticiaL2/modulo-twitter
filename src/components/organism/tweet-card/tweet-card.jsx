import React, { useState } from "react";
import UserPhoto from "../../atoms/user-photo/user-photo";
import { FaRetweet } from "react-icons/fa";
import Actions from "../../molecules/actions/actions";
import TweetInput from "../../molecules/tweet-input-box/tweet-input-box";
import { formatTimeAgo } from "../../../utils/dateUtils";
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
import ModalTemplate from "../../template/modal-template/modal-template";

function TweetCard({
  userData,
  refreshTweets,
  addComment,
  addReplyWithQuote,
  isOpenCommentModal,
  onOpenCommentModal,
  isOpenRetweetModal,
  onOpenRetweetModal,
  onCloseRetweetModal,
  onCloseCommentModal,
}) {
  const navigate = useNavigate();

  const tweet =
    userData.tweetPai && userData.texto === null ? userData.tweetPai : userData;

  const tweetPaidoPai =
    userData.tweetPai && userData.tweetPai ? userData.tweetPai : null;

  let tweetToRender = tweetPaidoPai;

  if (tweetToRender && tweetToRender.texto === null && tweetToRender.tweetPai) {
    let tweetPaiDoTweetPai = tweetToRender.tweetPai;

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

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleTweetClick = () => {
    navigate(`/tweets/${id}/detalhes`);
  };

  const timeAgo = formatTimeAgo(new Date(data));
  const isRetweet = !!userData.tweetPai;

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
            <Retweet texto={tweet.texto} tweet={tweetToRender} />
          )}
        </ContentContainer>
        <FooterTweetCard>
          <Actions
            onClickRetweetModal={() => onOpenRetweetModal()}
            onClickCommentModal={() => onOpenCommentModal()}
            tweetId={id}
            comentarios={comentarios}
            likes={likes}
            liked={liked}
            retweets={retweets}
            retweeted={retweeted}
            userData={userData}
            refreshTweets={refreshTweets}
          ></Actions>

          <ModalTemplate
            showModal={isOpenCommentModal}
            onClose={onCloseCommentModal}
          >
            <Retweet tweet={tweet} />
            <TweetInput
              $border="none"
              buttonText="Post"
              placeholder="Add a comment"
              userData={tweet}
              onComment={addComment}
              isComment={true}
              id={tweet.id}
            />
          </ModalTemplate>

          <ModalTemplate
            showModal={isOpenRetweetModal}
            onClose={onCloseRetweetModal}
          >
            <Retweet tweet={tweet} />
            <TweetInput
              $border="none"
              buttonText="Reply"
              placeholder="Post your reply"
              userData={tweet}
              onComment={addReplyWithQuote}
              isComment={true}
              id={tweet.id}
            />
          </ModalTemplate>
        </FooterTweetCard>
      </>
    </ContainerTweetCard>
  );
}

export default TweetCard;
