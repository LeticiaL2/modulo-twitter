import React from "react";
import TweetCard from "../../organism/tweet-card/tweet-card";
import { Container } from "./styles";

const ListTweets = ({
  tweets,
  refreshTweets,
  addComment,
  addReplyWithQuote,
  openCommentModal,
  setOpenCommentModal,
  openRetweetModal,
  setOpenRetweetModal,
}) => {
  if (!tweets) {
    return null;
  }

  return (
    <>
      {tweets.map((tweet) => (
        <Container key={tweet.id}>
          <TweetCard
            userData={tweet}
            refreshTweets={refreshTweets}
            addComment={addComment}
            addReplyWithQuote={addReplyWithQuote}
            isOpenCommentModal={openCommentModal === tweet.id}
            onOpenCommentModal={() => setOpenCommentModal(tweet.id)}
            isOpenRetweetModal={openRetweetModal === tweet.id}
            onOpenRetweetModal={() => setOpenRetweetModal(tweet.id)}
            onCloseRetweetModal={() => setOpenRetweetModal(null)}
            onCloseCommentModal={() => setOpenCommentModal(null)}
          />
        </Container>
      ))}
    </>
  );
};

export default ListTweets;
