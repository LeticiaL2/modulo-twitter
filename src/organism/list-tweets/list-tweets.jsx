import React from "react"
import tweets from "../../db.json"
import "./list-tweets.css"
import TweetCard from "../../molecules/tweet-card/tweet-card"



function ListTweets() {
    
  const reversedTweets = [...tweets.tweets].reverse();

    return (
        <>
          {reversedTweets.map((tweet) => {
            return (
              <TweetCard
                key={tweet.id}
                id={tweet.id}
                nameProfile={tweet.nameProfile}
                user={tweet.user}
                text={tweet.textTweet}
                qtdReply={tweet.qtdReply}
                qtdRt={tweet.qtdRt}
                qtdFav={tweet.qtdFav}
                qtdView={tweet.qtdView}
              />
            );
          })}
        </>
      );
    }

export default ListTweets