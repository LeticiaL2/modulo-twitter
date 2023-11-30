import React, { useEffect, useState } from 'react'
import { Action, Container } from './styles'
import CommentIcon from '../../atoms/SVGIcons/CommentIcon'
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon'
import LikeIcon from '../../atoms/SVGIcons/LikeIcon'
import AnalyticsIcon from '../../atoms/SVGIcons/AnalyticsIcon'
import ShareIcon from '../../atoms/SVGIcons/ShareIcon'
import { colors } from '../../../styles/colors'
import Api from '../../../services/api'
import { getUserLocalStorage } from '../../../contexts/util'

const ListActions = ({ tweetId, comentarios, isLikedByUser, likes, isRetweetedByUser, retweets }) => {
  const [likedBoolean, setLikedBoolean] = useState(isLikedByUser)
  const [likesCount, setLikesCount] = useState(likes)

  const [retweetedBoolean, setRetweetedBoolean] = useState(isRetweetedByUser)
  const [retweetsCount, setRetweetsCount] = useState(retweets)

  const [isCommented, setIsCommented] = useState(false)
  const [commentsCount, setCommentsCount] = useState(comentarios)

  useEffect(() => {
    setLikedBoolean(isLikedByUser)
    setLikesCount(likes)
    setRetweetedBoolean(isRetweetedByUser)
    setRetweetsCount(retweets)
  }, [isLikedByUser, isRetweetedByUser])

  const handleLike = async (e) => {
    e.stopPropagation()
    const response = await Api.post(`api/v1/tweets/${tweetId}/likes`, {}, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
    if (response.data.mensagem.codigo === 201) {
      setLikedBoolean(prev => !prev)
      setLikesCount(prev => prev + 1)
    } else {
      setLikedBoolean(prev => !prev)
      setLikesCount(prev => prev - 1)

    }
  }

  const handleRetweet = async (e) => {
    e.stopPropagation()
    const response = await Api.post(`api/v1/tweets/${tweetId}/retweets`, {}, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
    console.log(response.data)
    if (response.data.mensagem.codigo === 201) {
      setRetweetedBoolean(prev => !prev)
      setRetweetsCount(prev => prev + 1)
    } else {
      setRetweetedBoolean(prev => !prev)
      setRetweetsCount(prev => prev - 1)

    }
  }

  const handleAnalytics = (e) => {
    e.stopPropagation()
  }

  const handleShare = (e) => {
    e.stopPropagation()
  }


  return (
    <Container>
      <Action $actionColor={colors.light_gray} $hoverColor={colors.blue}>
        <CommentIcon />
        <span>{comentarios === 0 ? '' : comentarios}</span>
      </Action>
      <Action $actionColor={retweetedBoolean ? colors.green : colors.light_gray} $hoverColor={colors.green} onClick={handleRetweet}>
        <RetweetIcon />
        <span>{retweetsCount === 0 ? '' : retweetsCount}</span>
      </Action>
      <Action $actionColor={likedBoolean ? colors.red : colors.light_gray} $hoverColor={colors.red} onClick={handleLike}>
        <LikeIcon />
        <span>{likesCount}</span>
      </Action>
      <Action $actionColor={colors.light_gray} onClick={handleAnalytics}>
        <AnalyticsIcon />
        <span></span>
      </Action>
      <Action $actionColor={colors.light_gray} onClick={handleShare}>
        <ShareIcon />
      </Action>
    </Container>
  )
}

export default ListActions