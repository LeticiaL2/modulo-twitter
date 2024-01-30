import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTweet } from '../services/tweetService';
import TweetFeedTemplate from '../templates/TweetFeedTemplate';
import './TweetFeedPage.css';

function TweetFeedPage() {
  const navigate = useNavigate();
  const [tweetText, setTweetText] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlePostTweet = async () => {
    const response = await postTweet(tweetText);
    const responseStatus = response.mensagem.codigo;
    if (responseStatus >= 200 && responseStatus < 300) {
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
