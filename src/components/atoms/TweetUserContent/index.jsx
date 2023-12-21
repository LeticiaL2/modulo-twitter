import { formatDistanceToNow } from 'date-fns'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../../styles/colors'
import Span from '../Span'
import TweetUserInfo from '../TweetUserInfo'
import UserPhoto from '../UserPhoto'
import { Container, RetweetContainer } from './styles'

const TweetUserContent = ({ content, retweetPai }) => {
  const [showMore, setShowMore] = useState(false)
  // const [isRemoved, setIsRemoved] = useState(retweetPai?.isRemoved ? true : false)
  const navigate = useNavigate()

  const text = content === null ? '' : content.length > 150 ?
    showMore ?
      content : content.slice(0, 147).concat('...') :
    content

  const handleShow = (e) => {
    e.stopPropagation()
    setShowMore(!showMore)
  }


  const handleNavigate = (e) => {
    e.stopPropagation()
    navigate(`/tweet/${retweetPai.id}`)
  }

  const formattedDate = retweetPai ? formatDistanceToNow(new Date(retweetPai.data), { addSuffix: true }) : null


  return (
    <Container>
      {text}
      {text.length === 150 && !showMore && <Span $fontColor={colors.blue} onClick={handleShow}>Show more</Span>}
      {text.length > 150 && showMore && <Span $fontColor={colors.blue} onClick={handleShow}>Show Less</Span>}
      {retweetPai && <RetweetContainer onClick={!retweetPai?.isRemoved ? handleNavigate : (e) => e.stopPropagation()}>
        {
          retweetPai.isRemoved ? <Span $fontColor={colors.gray}>This tweet is no longer available</Span> :
            <>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" $width="20px" $height="20px" />
                <TweetUserInfo nome={retweetPai.nome} usuario={retweetPai.usuario} dataFormatada={formattedDate} />
              </div>
              {retweetPai.texto}
            </>
        }

      </RetweetContainer>
      }
    </Container>
  )
}

export default TweetUserContent