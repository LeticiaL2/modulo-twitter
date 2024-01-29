import React, { createContext, useEffect, useState } from 'react';
import Api from '../services/api';

export const TweetsListContext = createContext();

const TweetTimelineProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [openCommentModalId, setOpenCommentModalId] = useState(null)
  const [openRetweetModalId, setOpenRetweetModalId] = useState(null)

  const fetchTweets = async () => {
    try {
      const response = await Api.get('api/v1/tweets')
      if (response.status !== 200) {
        throw new Error('Erro ao buscar os tweets')
      }
      setTweets(response.data.conteudo)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddTweet = async (tweet) => {
    try {
      const response = await Api.post('api/v1/tweets', tweet)

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong')
      }
      console.log(response.data.conteudo)
      fetchTweets()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchTweets()
  }, [])


  const updateTweets = (updatedTweet) => {
    const updatedList = tweets.map(
      tweet => {
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

  const handleAddComment = async (reply, id) => {
    try {
      const response = await Api.post(`api/v1/tweets/${id}/comentarios`, reply)

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong')
      }
      setOpenCommentModalId(null)
      fetchTweets()
    } catch (e) {
      console.log(e)
    }
  }

  const handleAddRetweetWithQuote = async (retweet, id) => {
    try {
      const response = await Api.post(`api/v1/tweets/${id}/retweets`, retweet)

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong')
      }
      setOpenRetweetModalId(null)
      fetchTweets()
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <TweetsListContext.Provider value={{
      tweets,
      refreshList: fetchTweets,
      handleAddTweet,
      handleAddRetweetWithQuote,
      updateTweets,
      handleAddComment,
      openCommentModalId,
      setOpenCommentModalId,
      openRetweetModalId,
      setOpenRetweetModalId
    }}>
      {children}
    </TweetsListContext.Provider>
  );
};

export default TweetTimelineProvider;