import React, { createContext, useEffect, useState } from 'react'
import { getUserLocalStorage } from '../../../contexts/util'
import { Api } from '../../../services/api'
import PostTweet from '../../molecules/PostTweet'
import TweetsList from '../../molecules/TweetsList'
import Header from '../../organisms/Header'

export const TweetContext = createContext()

function Main() {
  const [tweets, setTweets] = useState([])

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


  const handleAddTweet = async (tweet) => {
    try {
      const response = await Api.post('api/v1/tweets', tweet, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong')
      }

      getTweets()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TweetContext.Provider value={{refreshTweet: getTweets}}>
      <Header />
      <PostTweet onAddTweet={handleAddTweet} />
      <TweetsList tweets={tweets} />
    </TweetContext.Provider>
  );
}

export default Main;
