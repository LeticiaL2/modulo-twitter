import React, { useContext } from "react";
import TweetInput from "../../components/molecules/tweet-input-box/tweet-input-box";
import ListTweets from "../../components/organism/list-tweets/list-tweets";
import { Container, BoxCenter } from "./styles";
import HeaderHome from "../../components/molecules/header-home/header-home";
import GlobalStyles from "../../styles/global-style";
import { TweetsListContext } from "../../contexts/tweetsHomePageContext";
import { i18n } from "../../translate/i18n";
import Sidebar from "../../components/molecules/sidebar/sidebar";
function HomePage() {
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
      <Sidebar />

      <BoxCenter>
        <HeaderHome buttonText={i18n.t("home.logout")} />
        <TweetInput
          $border="1px solid #565656"
          buttonText={i18n.t("home.post")}
          placeholder={i18n.t("home.whatsHappening")}
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
