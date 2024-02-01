import React, { useContext } from "react";
import "./styles";
import TweetDetails from "../../components/organism/tweet-details/tweet-details";
import { BoxCenter, Container } from "./styles";
import TweetInput from "../../components/molecules/tweet-input-box/tweet-input-box";
import { AuthContext } from "../../contexts/auth";
import HeaderHome from "../../components/molecules/header-home/header-home";
import ListTweets from "../../components/organism/list-tweets/list-tweets";
import { TweetsDetailsContext } from "../../contexts/tweetsDetailsContext";
import { i18n } from "../../translate/i18n";

function DetailsPage() {
  const { user } = useContext(AuthContext);
  const {
    commentsList,
    addTweet,
    refreshTweets,
    addComment,
    addReplyWithQuote,
    openCommentModal,
    setOpenCommentModal,
    openRetweetModal,
    setOpenRetweetModal,
    tweet,
  } = useContext(TweetsDetailsContext);

  return (
    <Container>
      <BoxCenter>
        <HeaderHome buttonText={i18n.t("details.back")} />
        <TweetDetails
          refreshTweets={refreshTweets}
          tweet={tweet}
          addComment={addComment}
          addReplyWithQuote={addReplyWithQuote}
          openCommentModal={openCommentModal}
          setOpenCommentModal={setOpenCommentModal}
          openRetweetModal={openRetweetModal}
          setOpenRetweetModal={setOpenRetweetModal}
          onCloseRetweetModal={() => setOpenRetweetModal(null)}
          onCloseCommentModal={() => setOpenCommentModal(null)}
        ></TweetDetails>
        <TweetInput
          $border="none"
          buttonText={i18n.t("details.reply")}
          placeholder={i18n.t("details.postReply")}
          onTweet={addTweet}
        />
        <ListTweets
          tweets={commentsList}
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

export default DetailsPage;
