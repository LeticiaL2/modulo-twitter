import React, { useEffect, useState } from 'react'
import Header from '../../organisms/Header'
import PostTweet from '../../molecules/PostTweet'
import TweetsList from '../../molecules/TweetsList'
import { Api } from '../../../services/api'


function Main() {
  const [tweets, setTweets] = useState([])

  async function getTweets() {
    try {
      const response = await Api.get('posts?_expand=user')
      if (response.status !== 200) {
        throw new Error('Erro ao buscar os tweets')
      }
      setTweets(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTweets()
  }, [])


  const handleAddTweet = async (tweet) => {
    try {
      const response = await Api.post('posts', tweet)

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong')
      }

      getTweets()
    } catch (e) {
      console.log(e)
    }
  }

  const orderedTweets = [...tweets].reverse()

  return (
    <>
      <Header />
      <PostTweet onAddTweet={handleAddTweet} />
      <TweetsList tweets={orderedTweets} />
    </>
  );
}

export default Main;
