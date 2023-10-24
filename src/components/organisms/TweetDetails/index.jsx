import React, { useEffect, useState } from 'react'
import MainTweet from '../../molecules/MainTweet'
import PostTweet from '../../molecules/PostTweet'
import Header from '../../organisms/Header'
import { Api } from '../../../services/api'
import { useParams } from 'react-router-dom'

function TweetDetails() {
  const [tweet, setTweet] = useState(null)
  const { id } = useParams()


  useEffect(() => {
    async function getTweet() {
      try {
        const response = await Api.get(`posts/${id}/?_expand=user`)
        if (response.status !== 200) {
          throw new Error('Erro ao buscar o tweet')
        }
        console.log(response.data)
        setTweet(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getTweet()
  }, [id])

  return (
    <>
      <Header />
      {tweet && <MainTweet userData={tweet} />}
      <PostTweet placeholder="Post your reply"/>
    </>
  )
}

export default TweetDetails