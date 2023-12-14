import React from 'react'
import { colors } from '../../../styles/colors'
import DotIcon from '../SVGIcons/DotIcon'
import Span from '../Span'
import { Container, FlexContainer } from './styles'

const TweetUserInfo = ({ nome, usuario, dataFormatada }) => {

  return (
    <Container>
      <Span>{nome}</Span>
      <FlexContainer>
        <Span $fontColor={colors.light_gray}>@{usuario}</Span>
        <DotIcon />
        <Span $fontColor={colors.light_gray}>{dataFormatada}</Span>
      </FlexContainer>
    </Container>
  )
}

export default TweetUserInfo