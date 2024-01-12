import React, { useContext } from 'react';
import { TweetsListContext } from '../../../contexts/tweetsTimeline';
import PostTweet from '../../molecules/PostTweet';
import TweetsList from '../../molecules/TweetsList';
import MainTweetTimelineTemplate from '../../templates/MainTweetTimelineTemplate';
import { Container } from './styles';

function HomePage() {
  const { tweets, refreshList } = useContext(TweetsListContext)

  return (
      <Container>
        {/* <Main /> */}
        <MainTweetTimelineTemplate>
          <PostTweet />
          <TweetsList tweets={tweets} refreshList={refreshList}/>
        </MainTweetTimelineTemplate>
      </Container>
  )
}

export default HomePage;
