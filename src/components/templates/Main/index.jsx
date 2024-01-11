import React, { useContext } from 'react'
import { TweetsListContext } from '../../../contexts/tweetsTimeline'
import { getUserLocalStorage } from '../../../contexts/util'
import { Api } from '../../../services/api'
import PostTweet from '../../molecules/PostTweet'
import TweetsList from '../../molecules/TweetsList'
import Header from '../../organisms/Header'


function Main() {
  const { tweets, refreshTweets } = useContext(TweetsListContext)

  const handleAddTweet = async (tweet) => {
    try {
      const response = await Api.post('api/v1/tweets', tweet, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong')
      }
      refreshTweets()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Header />
      <PostTweet onAddTweet={handleAddTweet} />
      <TweetsList tweets={tweets} />
    </>
  );
}

export default Main;
