import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTweet, getTweets } from '../../services/tweetService';
import MiddleSection from '../../components/organisms/FeedPageMiddle/FeedPageMiddle';
import './FeedPage.scss';
import Loading from '../../components/atoms/Loading/Loading';

function FeedPage() {
  const navigate = useNavigate();
  const [tweetText, setTweetText] = useState('');
  const [tweetData, setTweetData] = useState(null);
  const [tweetPostedCheck, setTweetPostedCheck] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlePostTweet = async () => {
    const response = await postTweet(tweetText);
    const responseStatus = response.mensagem.codigo;
    if (responseStatus >= 200 && responseStatus < 300) {
      setTweetText('');
      setTweetPostedCheck(true);
    } else {
      alert('Erro ao postar Tweet', response.mensagem.texto);
    }
  };

  useEffect(() => {
    const handleGetTweets = async () => {
      const response = await getTweets();
      if (response.status) {
        setTweetData(response.conteudo);
        if (tweetPostedCheck) {
          setTweetPostedCheck(false);
        }
      } else {
        alert('Erro ao buscar Tweets', response.mensagem.texto);
      }
    };

    handleGetTweets();
  }, [tweetPostedCheck]);

  if (!tweetData) {
    return Loading;
  }

  return (
    <div className="tweet-feed--container">
      <div className="tweet-feed--section" id="left-section"></div>
      <MiddleSection
        handleLogout={handleLogout}
        tweetText={tweetText}
        setTweetText={setTweetText}
        handlePostTweet={handlePostTweet}
        tweetData={tweetData}
      />
      <div className="tweet-feed--section" id="right-section"></div>
    </div>
  );
}

export default FeedPage;
