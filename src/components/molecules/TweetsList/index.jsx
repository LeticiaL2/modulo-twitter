import React from 'react';
import Tweet from '../../organisms/Tweet';

function TweetsList({
  tweets,
  refreshList,
  updateTweets,
  handleAddComment,
  handleAddRetweetWithQuote,
  openCommentModalId,
  setOpenCommentModalId,
  openRetweetModalId,
  setOpenRetweetModalId }) {

  return (
    <>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          userData={tweet}
          refreshList={refreshList}
          updateTweets={updateTweets}
          handleAddComment={handleAddComment}
          handleAddRetweetWithQuote={handleAddRetweetWithQuote}
          isOpenCommentModal={openCommentModalId === tweet.id}
          onOpenCommentModal={() => setOpenCommentModalId(tweet.id)}
          onCloseCommentModal={() => setOpenCommentModalId(null)}
          isOpenRetweetModal={openRetweetModalId === tweet.id}
          onOpenRetweetModal={() => setOpenRetweetModalId(tweet.id)}
          onCloseRetweetModal={() => setOpenRetweetModalId(null)} />
      ))}
    </>
  );
}

export default TweetsList;
