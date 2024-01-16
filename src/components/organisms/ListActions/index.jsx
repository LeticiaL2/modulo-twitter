import React, { useEffect, useState } from 'react'
import { getUserLocalStorage } from '../../../contexts/util'
import Api from '../../../services/api'
import { colors } from '../../../styles/colors'
import DropdownItem from '../../molecules/DropdownItem'
import DropdownMenu from '../../templates/DropdownMenuTemplate'
import AnalyticsIcon from '../../atoms/SVGIcons/AnalyticsIcon'
import CommentIcon from '../../atoms/SVGIcons/CommentIcon'
import LikeIcon from '../../atoms/SVGIcons/LikeIcon'
import QuoteIcon from '../../atoms/SVGIcons/QuoteIcon'
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon'
import ShareIcon from '../../atoms/SVGIcons/ShareIcon'
import Span from '../../atoms/Span'
import { ActionContainer, FooterContainer } from './styles'

const ListActions = ({ tweetId, comentarios, isLikedByUser, likes, isRetweetedByUser, isRetweetedWithoutQuoteByUser, retweets, onClickModal, onClickRetweetModal, onClickLikeListUpdate, onSuccessAction }) => {
  const [likedBoolean, setLikedBoolean] = useState(isLikedByUser)
  const [likesCount, setLikesCount] = useState(likes)

  const [retweetedBoolean, setRetweetedBoolean] = useState(isRetweetedByUser)
  const [retweetedWithoutQuoteBoolean, setRetweetedWithoutQuoteBoolean] = useState(isRetweetedWithoutQuoteByUser.length > 0 ? true : false)
  const [retweetsCount, setRetweetsCount] = useState(retweets)

  const [openRetweetDropdown, setOpenRetweetDropdown] = useState(false)

  useEffect(() => {
    setLikedBoolean(isLikedByUser)
    setLikesCount(likes)
    setRetweetedBoolean(isRetweetedByUser)
    setRetweetedWithoutQuoteBoolean(isRetweetedWithoutQuoteByUser.length > 0 ? true : false)
    setRetweetsCount(retweets)
  }, [isLikedByUser, isRetweetedByUser, isRetweetedWithoutQuoteByUser, likes, retweets])

  const handleLike = async (e) => {
    try {
      e.stopPropagation()
      const response = await Api.post(`api/v1/tweets/${tweetId}/likes`,
        {},
        {
          headers:
          {
            Authorization: `Bearer ${getUserLocalStorage().token}`
          }
        })
      if (response.data.mensagem.codigo === 201) {
        setLikedBoolean(prev => !prev)
        setLikesCount(prev => prev + 1)
      } else if (response.data.mensagem.codigo === 200) {
        setLikedBoolean(prev => !prev)
        setLikesCount(prev => prev - 1)
      }
      onClickLikeListUpdate(likedBoolean, likesCount)
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = async (e) => {
    e.stopPropagation()
    onClickModal()
  }

  const handleRetweetWithQuote = async (e) => {
    e.stopPropagation()
    setOpenRetweetDropdown(false)
    onClickRetweetModal()
  }

  const handleRetweetWithoutQuote = async () => {
    try {
      const response = await Api.post(`api/v1/tweets/${tweetId}/retweets`, {}, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      if (onSuccessAction && response.data.mensagem.codigo === 201) {
        onSuccessAction()
      }
    } catch (error) {
      console.log(error)
    }
    setOpenRetweetDropdown(false)
  }

  const handleUndoRetweet = async (e) => {
    try {
      e.stopPropagation()
      const response = await Api.delete(`api/v1/tweets/${isRetweetedWithoutQuoteByUser[0].tweet.id}`, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      if (onSuccessAction && response.data.mensagem.codigo === 200) {
        onSuccessAction()
      }
    } catch (error) {
      console.log(error)
    }
    setOpenRetweetDropdown(!openRetweetDropdown)
  }

  const handleRetweetDropdown = async (e) => {
    e.stopPropagation()
    setOpenRetweetDropdown(!openRetweetDropdown)
  }

  const handleAnalytics = (e) => {
    e.stopPropagation()
  }

  const handleShare = (e) => {
    e.stopPropagation()
  }

  return (
    <FooterContainer>
      <ActionContainer $actionColor={colors.light_gray} $hoverColor={colors.blue} onClick={handleComment}>
        <CommentIcon />
        <Span>{comentarios === 0 ? '' : comentarios}</Span>
      </ActionContainer>
      <ActionContainer $actionColor={retweetedBoolean ? colors.green : colors.light_gray} $hoverColor={colors.green} onClick={handleRetweetDropdown}>
        <RetweetIcon />
        <Span>{retweetsCount === 0 ? '' : retweetsCount}</Span>
        <DropdownMenu showDropdown={openRetweetDropdown} setShowDropdown={setOpenRetweetDropdown}>
          {retweetedWithoutQuoteBoolean ?
            <DropdownItem icon={<RetweetIcon />} onClick={handleUndoRetweet}>Undo repost</DropdownItem>
            : <DropdownItem icon={<RetweetIcon />} onClick={handleRetweetWithoutQuote}>Retweet</DropdownItem>
          }
          <DropdownItem icon={<QuoteIcon />} onClick={handleRetweetWithQuote}>Quote</DropdownItem>
        </DropdownMenu>
      </ActionContainer>
      <ActionContainer $actionColor={likedBoolean ? colors.red : colors.light_gray} $hoverColor={colors.red} onClick={handleLike}>
        <LikeIcon />
        <Span>{likesCount === 0 ? '' : likesCount}</Span>
      </ActionContainer>
      <ActionContainer $actionColor={colors.light_gray} onClick={handleAnalytics}>
        <AnalyticsIcon />
        <Span></Span>
      </ActionContainer>
      <ActionContainer $actionColor={colors.light_gray} onClick={handleShare}>
        <ShareIcon />
      </ActionContainer>
    </FooterContainer>
  )
}

export default ListActions