import React, { useContext } from "react";
import "./styles";
import TweetDetails from "../../components/organism/tweet-details/tweet-details";
import { BoxCenter, Container } from "./styles";
import TweetInput from "../../components/molecules/tweet-input-box/tweet-input-box";
//import { AuthContext } from "../../contexts/auth";
import HeaderHome from "../../components/molecules/header-home/header-home";
import ListTweets from "../../components/organism/list-tweets/list-tweets";
import { TweetsDetailsContext } from "../../contexts/tweetsDetailsContext";

function DetailsPage() {
  //const { user } = useContext(AuthContext);
  const { commentsList, addTweet, refreshTweets } =
    useContext(TweetsDetailsContext);

  return (
    <Container>
      <BoxCenter>
        <HeaderHome buttonText="Voltar" />
        <TweetDetails refreshTweets={refreshTweets}></TweetDetails>
        <TweetInput
          $border="none"
          buttonText="Reply"
          placeholder="Post your reply!"
          onTweet={addTweet}
        />
        <ListTweets tweets={commentsList} refreshTweets={refreshTweets} />
      </BoxCenter>
    </Container>
  );
}

export default DetailsPage;
