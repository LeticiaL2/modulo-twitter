import React from 'react';
import Tweet from '../../organisms/Tweet';

function TweetsList({ tweets, refreshList, updateTweets, handleAddComment, openCommentModalId, setOpenCommentModalId }) {
  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} userData={tweet} refreshList={refreshList} updateTweets={updateTweets} handleAddComment={handleAddComment} openCommentModalId={openCommentModalId} setOpenCommentModalId={setOpenCommentModalId} />
      ))}
    </>
  );
}

export default TweetsList;
