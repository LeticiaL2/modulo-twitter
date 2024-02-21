import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTweet } from '../../services/tweetService';
import MiddleSection from '../../components/organisms/FeedPageMiddle/FeedPageMiddle';
import './FeedPage.scss';

function FeedPage() {
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
    <div className="tweet-feed--container">
      <div className="tweet-feed--section" id="left-section"></div>
      <MiddleSection
        handleLogout={handleLogout}
        tweetText={tweetText}
        setTweetText={setTweetText}
        handlePostTweet={handlePostTweet}
      />
      <div className="tweet-feed--section" id="right-section"></div>
    </div>
  );
}

export default FeedPage;
