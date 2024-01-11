import React, { createContext, useEffect, useState } from 'react';
import Api from '../services/api';
import { getUserLocalStorage } from './util';

export const TweetsListContext = createContext();

const TweetTimelineProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);

  async function getTweets() {
    try {
      const response = await Api.get('api/v1/tweets', { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      if (response.status !== 200) {
        throw new Error('Erro ao buscar os tweets')
      }
      setTweets(response.data.conteudo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTweets()
  }, [])


  const updateTweets = (updatedTweet, isRetweet) => {
   const updatedList = isRetweet ? tweets.map(
    tweet => {
      if (tweet.retweetPai && tweet.retweetPai.id === updatedTweet.id) {
        return { ...tweet, retweetPai: updatedTweet }
      }
      if (tweet.id === updatedTweet.id) {
        return { ...tweet, isLikedByUser: updatedTweet.isLikedByUser, likes: updatedTweet.likes, comentarios: updatedTweet.comentarios }
      }
      return tweet
    }) : tweets.map(tweet => {
      if (tweet.retweetPai?.id === updatedTweet.id) {
        return { ...tweet, retweetPai: updatedTweet }
      }
      if (tweet.id === updatedTweet.id) {
        return { ...tweet, isLikedByUser: updatedTweet.isLikedByUser, likes: updatedTweet.likes, comentarios: updatedTweet.comentarios }
      }
      return tweet
    })

    setTweets(updatedList)
  }

  return (
    <TweetsListContext.Provider value={{ tweets, refreshTweets: getTweets, updateTweets }}>
      {children}
    </TweetsListContext.Provider>
  );
};

export default TweetTimelineProvider;