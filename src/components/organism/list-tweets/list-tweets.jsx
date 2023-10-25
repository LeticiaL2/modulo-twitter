import React from "react"
import tweets from "../../../db.json"
import TweetCard from "../../organism/tweet-card/tweet-card"
import replies from "../../../db.json"
import ReplyCard from "../reply-card/reply-card"
import {Container} from './styles'



function ListTweets() {
    
  const reversedTweets = [...tweets.tweets].reverse();
  
  
  return (
    <>
      {reversedTweets.map((tweet) => (
        <Container key={tweet.id}>
          <TweetCard
            id={tweet.id}
            nameProfile={tweet.nameProfile}
            user={tweet.user}
            text={tweet.textTweet}
            qtdReply={tweet.qtdReply}
            qtdRt={tweet.qtdRt}
            qtdFav={tweet.qtdFav}
            qtdView={tweet.qtdView}
            date={tweet.date}
            qtdBookMark={tweet.qtdBookMark}
            replies={tweet.replies} 
          />
        </Container>
      ))}
    </>
  );
}

export default ListTweets;