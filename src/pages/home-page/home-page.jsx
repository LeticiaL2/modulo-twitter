import React, { useContext } from "react";
import TweetInput from "../../components/molecules/tweet-input-box/tweet-input-box";
import ListTweets from "../../components/organism/list-tweets/list-tweets";
import { Container, BoxCenter } from "./styles";
import HeaderHome from "../../components/molecules/header-home/header-home";
import GlobalStyles from "../../styles/global-style";
import { TweetsListContext } from "../../contexts/tweetsHomePageContext";
import { AuthContext } from "../../contexts/auth";

function HomePage() {
  const { user } = useContext(AuthContext);

  const {
    tweets,
    refreshTweets,
    addTweet,
    addComment,
    addReplyWithQuote,
    openCommentModal,
    setOpenCommentModal,
    openRetweetModal,
    setOpenRetweetModal,
  } = useContext(TweetsListContext);

  return (
    <Container>
      <GlobalStyles />
      <BoxCenter>
        <HeaderHome buttonText="Sair" />
        <TweetInput
          $border="1px solid #565656"
          buttonText="Post"
          placeholder="What is happening?!"
          onTweet={addTweet}
          refreshTweets={refreshTweets}
        />
        <ListTweets
          tweets={tweets}
          refreshTweets={refreshTweets}
          addComment={addComment}
          addReplyWithQuote={addReplyWithQuote}
          openCommentModal={openCommentModal}
          setOpenCommentModal={setOpenCommentModal}
          openRetweetModal={openRetweetModal}
          setOpenRetweetModal={setOpenRetweetModal}
        />
      </BoxCenter>
    </Container>
  );
}

export default HomePage;
