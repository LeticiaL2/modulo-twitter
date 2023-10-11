import React from 'react'
import Tweet from '../../molecules/Tweet'

const TweetsList = ({tweets}) => {
  return (
    <>
      {tweets.map(tweet => <Tweet key={tweet.id} userData={tweet}/>)}
    </>

  )
}

export default TweetsList