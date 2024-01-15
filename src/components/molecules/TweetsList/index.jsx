import React from 'react';
import Tweet from '../../organisms/Tweet';

function TweetsList({ tweets, refreshList, updateTweets }) {
  return (
    <>
      {tweets.map((tweet) => (
          <Tweet key={tweet.id} userData={tweet} refreshList={refreshList} updateTweets={updateTweets}/>
      ))}
    </>
  );
}

export default TweetsList;
