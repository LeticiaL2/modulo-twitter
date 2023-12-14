import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import MoreIcon from '../../atoms/SVGIcons/MoreIcon'
import TweetUserContent from '../../atoms/TweetUserContent'
import TweetUserInfo from '../../atoms/TweetUserInfo'
import { Container, HeaderContainer } from './styles'

const BodyTweet = ({ userData }) => {
  const { usuario, nome, texto: content, data: date, retweetPai } = userData

  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true })

  return (
    <Container>
      <HeaderContainer>
        <TweetUserInfo nome={nome} usuario={usuario} dataFormatada={formattedDate}/>
        {retweetPai && <MoreIcon />}
      </HeaderContainer>
      <TweetUserContent content={content} retweetPai={retweetPai}/>
    </Container>

  )
}

export default BodyTweet