import React, { useContext } from 'react'
import { TweetDetailContext } from '../../../contexts/tweetDetail'
import ReplyTweet from '../../molecules/ReplyTweet'
import TweetsList from '../../molecules/TweetsList'
import MainTweet from '../../organisms/MainTweet'
import MainTweetTimelineTemplate from '../../templates/MainTweetTimelineTemplate'

function TweetPage() {
  const { tweet, postUser, commentsList, refreshList, updateTweets, handleAddComment } = useContext(TweetDetailContext)

  return (
    <MainTweetTimelineTemplate>
      {tweet && <MainTweet userData={tweet} refreshList={refreshList} updateTweets={updateTweets} handleAddComment={handleAddComment} />}
      {postUser && <ReplyTweet postUser={postUser} tweetId={tweet.id} handleAddComment={handleAddComment} />}
      {commentsList && <TweetsList tweets={commentsList} refreshList={refreshList} handleAddComment={handleAddComment} />}
    </MainTweetTimelineTemplate>
  )
}

export default TweetPage