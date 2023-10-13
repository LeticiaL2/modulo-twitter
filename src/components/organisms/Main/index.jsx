import React, {useEffect, useState } from 'react';
import Header from '../../organisms/Header';
import PostTweet from '../../molecules/PostTweet';
import TweetsList from '../../molecules/TweetsList';

function Main() {
  const [tweets, setTweets] = useState([]);

  async function getTweets() {
    try {
      const response = await fetch('http://localhost:3004/posts');
      if (!response.ok) {
        throw new Error('Erro ao buscar os tweets');
      }

      const data = await response.json();
      setTweets(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTweets();
  }, []);

  const handleAddTweet = async (tweet) => {
    try {
      const response = await fetch('http://localhost:3004/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tweet),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      getTweets();
    } catch (e) {
      console.log(e);
    }
  };


  const orderedTweets = [...tweets].reverse();

  return (
    <>
      <Header />
      <PostTweet onAddTweet={handleAddTweet} />
      <TweetsList tweets={orderedTweets} />
    </>
  );
}

export default Main;
