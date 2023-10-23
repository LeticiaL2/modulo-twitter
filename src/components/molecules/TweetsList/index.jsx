import React from 'react';
import Tweet from '../Tweet';
import { StyledLink } from './style';

function TweetsList({ tweets }) {
  return (
    <>
      {tweets.map((tweet) => (
        <StyledLink to={`/tweet/${tweet.id}`} key={tweet.id}>
        <Tweet  userData={tweet} />
        </StyledLink>
      ))}
    </>
  );
}

export default TweetsList;
