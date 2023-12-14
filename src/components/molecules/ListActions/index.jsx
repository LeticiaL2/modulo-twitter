import React, { useEffect, useState } from 'react'
import { getUserLocalStorage } from '../../../contexts/util'
import Api from '../../../services/api'
import { colors } from '../../../styles/colors'
import AnalyticsIcon from '../../atoms/SVGIcons/AnalyticsIcon'
import CommentIcon from '../../atoms/SVGIcons/CommentIcon'
import LikeIcon from '../../atoms/SVGIcons/LikeIcon'
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon'
import ShareIcon from '../../atoms/SVGIcons/ShareIcon'
import { ActionContainer, FooterContainer } from './styles'
import DropdownMenu from '../../atoms/DropdownMenu'
import Span from '../../atoms/Span'
import DropdownItem from '../../atoms/DropdownItem'
import QuoteIcon from '../../atoms/SVGIcons/QuoteIcon'

const ListActions = ({ tweetId, comentarios, isLikedByUser, likes, isRetweetedByUser, retweets, onClickModal, onClickRetweetModal, onClickWithoutQuote }) => {
  const [likedBoolean, setLikedBoolean] = useState(isLikedByUser)
  const [likesCount, setLikesCount] = useState(likes)

  const [retweetedBoolean, setRetweetedBoolean] = useState(isRetweetedByUser)
  const [retweetsCount, setRetweetsCount] = useState(retweets)


  // const [isCommented, setIsCommented] = useState(false)
  // const [commentsCount, setCommentsCount] = useState(comentarios)

  const [openRetweetDropdown, setOpenRetweetDropdown] = useState(false)

  // const closeDropdown = () => setShowDropdown(false);

  // useEffect(() => {
  //   // const handleRetweetDropdown
  //   if (showDropdown) {
  //     document.addEventListener('click', closeDropdown);
  //   } else {
  //     document.removeEventListener('click', closeDropdown);
  //   }

  //   // Limpa o ouvinte de evento quando o componente é desmontado
  //   return () => {
  //     document.removeEventListener('click', closeDropdown);
  //   };
  // }, [showDropdown]);

  useEffect(() => {
    setLikedBoolean(isLikedByUser)
    setLikesCount(likes)
    setRetweetedBoolean(isRetweetedByUser)
    setRetweetsCount(retweets)
  }, [isLikedByUser, isRetweetedByUser, likes, retweets])

  const handleLike = async (e) => {
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
    } else {
      setLikedBoolean(prev => !prev)
      setLikesCount(prev => prev - 1)

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

  const handleRetweetWithoutQuote = async (e) => {
    onClickWithoutQuote()
    setOpenRetweetDropdown(false)
  }

  const handleRetweetDropdown = async (e) => {
    e.stopPropagation()
    setOpenRetweetDropdown(true)
    // const response = await Api.post(`api/v1/tweets/${tweetId}/retweets`, {}, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
    // console.log(response.data)
    // if (response.data.mensagem.codigo === 201) {
    //   setRetweetedBoolean(prev => !prev)
    //   setRetweetsCount(prev => prev + 1)
    // } else {
    //   setRetweetedBoolean(prev => !prev)
    //   setRetweetsCount(prev => prev - 1)

    // }
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
          {!retweetedBoolean ?
            <DropdownItem icon={<RetweetIcon />} onClick={handleRetweetWithoutQuote}>Retweet</DropdownItem>
            : <DropdownItem icon={<RetweetIcon />}>Undo repost</DropdownItem>
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