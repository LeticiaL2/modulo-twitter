import React, { useContext } from 'react'
import { TweetDetailContext } from '../../../contexts/tweetDetail'
import ReplyTweet from '../../molecules/ReplyTweet'
import TweetsList from '../../molecules/TweetsList'
import MainTweet from '../../organisms/MainTweet'
import MainTweetTimelineTemplate from '../../templates/MainTweetTimelineTemplate'

function TweetPage() {
  const { tweet, postUser, commentsList, handleAddRetweetWithQuote, refreshList, updateTweets, handleAddComment, openCommentModalId, setOpenCommentModalId, openRetweetModalId, setOpenRetweetModalId } = useContext(TweetDetailContext)

  return (
    <MainTweetTimelineTemplate>
      {tweet &&
        <MainTweet
          userData={tweet}
          refreshList={refreshList}
          updateTweets={updateTweets}
          handleAddComment={handleAddComment}
          handleAddRetweetWithQuote={handleAddRetweetWithQuote}
          isOpenCommentModal={openCommentModalId === tweet.id}
          onOpenCommentModal={() => setOpenCommentModalId(tweet.id)}
          onCloseCommentModal={() => setOpenCommentModalId(null)}
          isOpenRetweetModal={openRetweetModalId === tweet.id}
          onOpenRetweetModal={() => setOpenRetweetModalId(tweet.id)}
          onCloseRetweetModal={() => setOpenRetweetModalId(null)}
        />}
      {postUser && <ReplyTweet postUser={postUser} tweetId={tweet.id} handleAddComment={handleAddComment} />}
      {commentsList &&
        <TweetsList
          tweets={commentsList}
          refreshList={refreshList}
          handleAddComment={handleAddComment}
          handleAddRetweetWithQuote={handleAddRetweetWithQuote}
          openCommentModalId={openCommentModalId}
          setOpenCommentModalId={setOpenCommentModalId}
          openRetweetModalId={openRetweetModalId}
          setOpenRetweetModalId={setOpenRetweetModalId}
        />}
    </MainTweetTimelineTemplate>
  )
}

export default TweetPage