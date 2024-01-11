import React from 'react';
import Main from '../../templates/Main';
import TweetTimelineProvider from '../../../contexts/tweetsTimeline';
import { Container } from './styles';

function HomePage() {
  return (
    <TweetTimelineProvider>
      <Container>
        <Main />
      </Container>
    </TweetTimelineProvider>
  )
}

export default HomePage;
