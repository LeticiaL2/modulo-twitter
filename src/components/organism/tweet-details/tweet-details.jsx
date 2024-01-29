import React from "react";
import ptBR from "date-fns/locale/pt-BR";
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
import Actions from "../../molecules/actions/actions";
import Retweet from "../../molecules/retweet/retweet";
import TweetInput from "../../molecules/tweet-input-box/tweet-input-box";
import ModalTemplate from "../../template/modal-template/modal-template";

const TweetDetails = ({
  tweet,
  refreshTweets,
  addComment,
  addReplyWithQuote,
  onCloseRetweetModal,
  onCloseCommentModal,
  openCommentModal,
  setOpenCommentModal,
  openRetweetModal,
  setOpenRetweetModal,
}) => {
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
          refreshTweets={refreshTweets}
          userData={tweet}
          onClickRetweetModal={() => setOpenRetweetModal(tweet.id)}
          onClickCommentModal={() => setOpenCommentModal(tweet.id)}
        ></Actions>

        <ModalTemplate
          showModal={openCommentModal === tweet.id}
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
          showModal={openRetweetModal === tweet.id}
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
    </TweetDetailsContainer>
  );
};

export default TweetDetails;
