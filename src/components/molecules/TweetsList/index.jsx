import React from 'react';
import Tweet from '../../organisms/Tweet';

function TweetsList({ tweets }) {
  return (
    <>
      {tweets.map((tweet) => (
          <Tweet key={tweet.id} userData={tweet} />
      ))}
    </>
  );
}

export default TweetsList;
