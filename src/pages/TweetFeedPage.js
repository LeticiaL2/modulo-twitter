import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTweet } from '../services/tweetService';
import TweetFeedTemplate from '../templates/TweetFeedTemplate';
import './TweetFeed.css';

function TweetFeedPage() {
  const navigate = useNavigate();
  const [tweetText, setTweetText] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlePostTweet = async () => {
    const response = await postTweet(tweetText);
    if (response.status) {
      setTweetText('');
    } else {
      alert('Failed to post tweet', response.mensagem.texto);
    }
  };

  return (
    <TweetFeedTemplate
      handleLogout={handleLogout}
      tweetText={tweetText}
      setTweetText={setTweetText}
      handlePostTweet={handlePostTweet}
    />
  );
}

export default TweetFeedPage;
