import React, { useContext } from 'react'
import { TweetDetailContext } from '../../../contexts/tweetDetail'
import MainTweet from '../../organisms/MainTweet'
import MainTweetTimelineTemplate from '../../templates/MainTweetTimelineTemplate'
import { Container } from './styles'
import ReplyTweet from '../../molecules/ReplyTweet'
import TweetsList from '../../molecules/TweetsList'

function TweetPage() {
  const { tweet, postUser, commentsList, refreshList } = useContext(TweetDetailContext)
  return (
      <Container>
        <MainTweetTimelineTemplate>
         { tweet && <MainTweet userData={tweet}/> }
         { postUser && <ReplyTweet postUser={postUser} /> }
         { commentsList && <TweetsList tweets={commentsList} refreshList={refreshList}/> }
        </MainTweetTimelineTemplate>
      </Container>
  )
}

export default TweetPage