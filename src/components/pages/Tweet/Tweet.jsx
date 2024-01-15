import React, { useContext } from 'react'
import { TweetDetailContext } from '../../../contexts/tweetDetail'
import ReplyTweet from '../../molecules/ReplyTweet'
import TweetsList from '../../molecules/TweetsList'
import MainTweet from '../../organisms/MainTweet'
import MainTweetTimelineTemplate from '../../templates/MainTweetTimelineTemplate'

function TweetPage() {
  const { tweet, postUser, commentsList, refreshList, handleAddComment } = useContext(TweetDetailContext)
  return (
      <MainTweetTimelineTemplate>
        {tweet && <MainTweet userData={tweet} />}
        {postUser && <ReplyTweet postUser={postUser} />}
        {commentsList && <TweetsList tweets={commentsList} refreshList={refreshList}/>}
      </MainTweetTimelineTemplate>
  )
}

export default TweetPage