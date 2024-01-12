import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../services/api";
import { getUserLocalStorage } from "./util";


export const TweetDetailContext = createContext();

const TweetDetailProvider = ({ children }) => {
  const { id } = useParams()
  const [tweet, setTweet] = useState(null)
  const [postUser, setPostUser] = useState(null)
  const [commentsList, setCommentsList] = useState([])

  const getTweet = async () => {
    try {
      const response = await Api.get(`/api/v1/tweets/${id}`, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      if (response.status !== 200) {
        throw new Error('Erro ao buscar o tweet')
      }
      setPostUser(response.data.conteudo.usuario)
      setTweet(response.data.conteudo)
      setCommentsList(response.data.conteudo.comentariosArray)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddComment = async (reply) => {
    try {
      const response = await Api.post(`api/v1/tweets/${id}/comentarios`, reply, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong')
      }

      getTweet()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getTweet()
  }, [id])

  const updateTweets = (updatedTweet, isRetweet) => {
    const updatedList = isRetweet ? commentsList.map(
      tweet => {
        if (tweet.retweetPai && tweet.retweetPai.id === updatedTweet.id) {
          return { ...tweet, retweetPai: updatedTweet }
        }
        if (tweet.id === updatedTweet.id) {
          return { ...tweet, isLikedByUser: updatedTweet.isLikedByUser, likes: updatedTweet.likes, comentarios: updatedTweet.comentarios }
        }
        return tweet
      }) : commentsList.map(tweet => {
        if (tweet.retweetPai?.id === updatedTweet.id) {
          return { ...tweet, retweetPai: updatedTweet }
        }
        if (tweet.id === updatedTweet.id) {
          return { ...tweet, isLikedByUser: updatedTweet.isLikedByUser, likes: updatedTweet.likes, comentarios: updatedTweet.comentarios }
        }
        return tweet
      })

    setCommentsList(updatedList)
  }

  return (
    <TweetDetailContext.Provider value={{ tweet, refreshList: getTweet, handleAddComment, postUser, commentsList, updateTweets }} >
      {children}
    </TweetDetailContext.Provider>
  )

}

export default TweetDetailProvider;