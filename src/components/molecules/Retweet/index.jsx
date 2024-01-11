import { formatDistanceToNow } from 'date-fns'
import React, { useState } from 'react'
import { colors } from '../../../styles/colors'
import DotIcon from '../../atoms/SVGIcons/DotIcon'
import MoreIcon from '../../atoms/SVGIcons/MoreIcon'
import Span from '../../atoms/Span'
import { ContentContainer, FlexContainer, HeaderContainer, UserInfoContainer } from './styles'

const Retweet = ({ userData }) => {
  const [showMore, setShowMore] = useState(false)
  const { usuario, nome, texto: content, data: date, retweetPai } = userData

  const text = content === null ? '' : content.length > 150 ?
    showMore ?
      content : content.slice(0, 147).concat('...') :
    content

  const handleShow = (e) => {
    e.stopPropagation()
    setShowMore(!showMore)
  }

  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true })

  return (
    <>
      <HeaderContainer>
        <UserInfoContainer>
          <Span>{nome}</Span>
          <FlexContainer>
            <Span $fontColor={colors.light_gray}>@{usuario}</Span>
            <DotIcon />
            <Span $fontColor={colors.light_gray}>{formattedDate}</Span>
          </FlexContainer>
        </UserInfoContainer>
        {retweetPai && <MoreIcon />}
      </HeaderContainer>
      <ContentContainer>
        {text}
        {text.length === 150 && !showMore && <Span $fontColor={colors.blue} onClick={handleShow}>Show more</Span>}
        {text.length > 150 && showMore && <Span $fontColor={colors.blue} onClick={handleShow}>Show Less</Span>}
      </ContentContainer>
    </>

  )
}

export default Retweet