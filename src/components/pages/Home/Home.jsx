import React, { useContext } from 'react';
import { TweetsListContext } from '../../../contexts/tweetsTimeline';
import PostTweet from '../../molecules/PostTweet';
import TweetsList from '../../molecules/TweetsList';
import MainTweetTimelineTemplate from '../../templates/MainTweetTimelineTemplate';

function HomePage() {
  const { tweets, refreshList, updateTweets, handleAddTweet, handleAddRetweetWithQuote, handleAddComment, openCommentModalId, setOpenCommentModalId, openRetweetModalId, setOpenRetweetModalId } = useContext(TweetsListContext)

  return (
    <MainTweetTimelineTemplate>
      <PostTweet handleAddTweet={handleAddTweet} />
      <TweetsList
        tweets={tweets}
        refreshList={refreshList}
        updateTweets={updateTweets}
        handleAddComment={handleAddComment}
        handleAddRetweetWithQuote={handleAddRetweetWithQuote}
        openCommentModalId={openCommentModalId}
        setOpenCommentModalId={setOpenCommentModalId}
        openRetweetModalId={openRetweetModalId}
        setOpenRetweetModalId={setOpenRetweetModalId}
      />
    </MainTweetTimelineTemplate>
  )
}

export default HomePage;
