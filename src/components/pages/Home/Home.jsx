import React, { useContext } from 'react';
import { TweetsListContext } from '../../../contexts/tweetsTimeline';
import PostTweet from '../../molecules/PostTweet';
import TweetsList from '../../molecules/TweetsList';
import MainTweetTimelineTemplate from '../../templates/MainTweetTimelineTemplate';

function HomePage() {
  const { tweets, refreshList, updateTweets, handleAddTweet, handleAddComment, openCommentModalId, setOpenCommentModalId } = useContext(TweetsListContext)

  return (
        <MainTweetTimelineTemplate>
          <PostTweet handleAddTweet={handleAddTweet}/>
          <TweetsList tweets={tweets} refreshList={refreshList} updateTweets={updateTweets} handleAddComment={handleAddComment} openCommentModalId={openCommentModalId} setOpenCommentModalId={setOpenCommentModalId}/>
        </MainTweetTimelineTemplate>
  )
}

export default HomePage;
