import React, { useContext } from 'react'
import { TweetDetailContext } from '../../../contexts/tweetDetail'
import { getUserLocalStorage } from '../../../contexts/util'
import { Api } from '../../../services/api'
import ReplyTweet from '../../molecules/ReplyTweet'
import TweetsList from '../../molecules/TweetsList'
import Header from '../../organisms/Header'
import MainTweet from '../../organisms/MainTweet'

// export const TweetContext = createContext()

function TweetDetails() {
  const {id, tweet, postUser, commentsList, getTweet} = useContext(TweetDetailContext)
  // const { id } = useParams()
  // const [tweet, setTweet] = useState(null)
  // const [postUser, setPostUser] = useState(null)
  // const [commentsList, setCommentsList] = useState([])

  // async function getTweet() {
  //   try {
  //     const response = await Api.get(`/api/v1/tweets/${id}`, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
  //     if (response.status !== 200) {
  //       throw new Error('Erro ao buscar o tweet')
  //     }
  //     setPostUser(response.data.conteudo.usuario)
  //     setTweet(response.data.conteudo)
  //     setCommentsList(response.data.conteudo.comentariosArray)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getTweet()
  // }, [id])


  const handleReplyTweet = async (reply) => {
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

  return (
    <>
      <Header />
      {tweet && <MainTweet userData={tweet} />}
      {postUser && <ReplyTweet onReplyTweet={handleReplyTweet} postUser={postUser} />}
      {commentsList.length !== 0 && <TweetsList tweets={commentsList} />}
    </>
  )
}

export default TweetDetails