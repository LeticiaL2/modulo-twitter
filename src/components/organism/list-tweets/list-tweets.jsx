import React from "react";
import TweetCard from "../../organism/tweet-card/tweet-card";
import { Container } from "./styles";

const ListTweets = ({ tweets }) => {
  if (!tweets) {
    return null;
  }

  return (
    <>
      {tweets.map((tweet) => (
        <Container key={tweet.id}>
          <TweetCard userData={tweet} />
        </Container>
      ))}
    </>
  );
};

export default ListTweets;
