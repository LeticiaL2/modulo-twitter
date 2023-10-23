import React, { useEffect, useState } from 'react'
import Tweet from '../../molecules/Tweet'
import { Api } from '../../../services/api'
import { useParams } from 'react-router-dom'

function TweetDetails() {
  const [tweet, setTweet] = useState({})
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
    <div>
      {/* <Tweet userData={tweet} /> */}
      {id}
    </div>
  )
}

export default TweetDetails