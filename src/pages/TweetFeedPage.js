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
    console.log(response);
    if (response.status >= 200 && response.stats < 300) {
      setTweetText('');
    } else {
      alert('Erro ao postar Tweet', response.mensagem.texto);
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
