import React from 'react';
import Tweet from '../../organisms/Tweet';

function TweetsList({ tweets, refreshList }) {
  return (
    <>
      {tweets.map((tweet) => (
          <Tweet key={tweet.id} userData={tweet} refreshList={refreshList}/>
      ))}
    </>
  );
}

export default TweetsList;
