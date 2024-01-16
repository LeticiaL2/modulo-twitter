import React from 'react';
import Tweet from '../../organisms/Tweet';

function TweetsList({ tweets, refreshList, updateTweets, handleAddComment }) {
  return (
    <>
      {tweets.map((tweet) => (
          <Tweet key={tweet.id} userData={tweet} refreshList={refreshList} updateTweets={updateTweets} handleAddComment={handleAddComment}/>
      ))}
    </>
  );
}

export default TweetsList;
