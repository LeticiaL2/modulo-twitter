import React, { useEffect, useState } from 'react'
import Header from '../../organisms/Header'
import PostTweet from '../../molecules/PostTweet'
import TweetsList from '../../molecules/TweetsList'
import { Api } from '../../../services/api'
import { getUserLocalStorage } from '../../../contexts/util'


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
    <>
      <Header />
      <PostTweet onAddTweet={handleAddTweet} />
      <TweetsList tweets={tweets} />
    </>
  );
}

export default Main;
