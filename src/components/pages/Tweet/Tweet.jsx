import React from 'react'
import TweetDetails from '../../templates/TweetDetails'
import { Container } from './styles'
import TweetDetailProvider from '../../../contexts/tweetDetail'

function TweetPage() {
  return (
    <TweetDetailProvider>
      <Container>
        <TweetDetails />
      </Container>
    </TweetDetailProvider>
  )
}

export default TweetPage