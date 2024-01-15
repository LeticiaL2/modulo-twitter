import React, { useContext } from 'react';
import { TweetsListContext } from '../../../contexts/tweetsTimeline';
import PostTweet from '../../molecules/PostTweet';
import TweetsList from '../../molecules/TweetsList';
import MainTweetTimelineTemplate from '../../templates/MainTweetTimelineTemplate';

function HomePage() {
  const { tweets, refreshList, updateTweets } = useContext(TweetsListContext)

  return (
        <MainTweetTimelineTemplate>
          <PostTweet />
          <TweetsList tweets={tweets} refreshList={refreshList} updateTweets={updateTweets}/>
        </MainTweetTimelineTemplate>
  )
}

export default HomePage;
