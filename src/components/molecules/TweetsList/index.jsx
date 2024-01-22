import React from 'react';
import Tweet from '../../organisms/Tweet';

function TweetsList({ tweets, refreshList, updateTweets, handleAddComment, openCommentModalId, setOpenCommentModalId }) {
  return (
    <>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          userData={tweet}
          refreshList={refreshList}
          updateTweets={updateTweets}
          handleAddComment={handleAddComment}
          isOpenCommentModal={openCommentModalId === tweet.id}
          onOpenCommentModal={() => setOpenCommentModalId(tweet.id)}
          onCloseCommentModal={() => setOpenCommentModalId(null)} />
      ))}
    </>
  );
}

export default TweetsList;
