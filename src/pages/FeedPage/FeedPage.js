import { useEffect, useState } from 'react';
import { postTweet, getTweets, toggleLike } from '../../services/tweetService';
import MiddleSection from '../../components/organisms/FeedPageMiddle/FeedPageMiddle';
import './FeedPage.scss';
import Loading from '../../components/atoms/Loading/Loading';
import { useAuth } from '../../contexts/auth-context';

function FeedPage() {
  const [tweetText, setTweetText] = useState('');
  const [tweetData, setTweetData] = useState(null);
  const [refreshCheck, setRefreshCheck] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handlePostTweet = async () => {
    const response = await postTweet(tweetText);
    const responseStatus = response.mensagem.codigo;
    if (responseStatus >= 200 && responseStatus < 300) {
      setTweetText('');
      setRefreshCheck(true);
    } else {
      alert('Erro ao postar Tweet', response.mensagem.texto);
    }
  };

  const handleLike = async (id, liked) => {
    if (event) event.preventDefault();
    const reponse = await toggleLike(id, liked);
    if (reponse.status) {
      setRefreshCheck(true);
    } else {
      alert('Erro ao curtir Tweet', reponse.mensagem.texto);
    }
  };

  useEffect(() => {
    const handleGetTweets = async () => {
      const response = await getTweets();
      if (response.status) {
        setTweetData(response.conteudo);
        if (refreshCheck) {
          setRefreshCheck(false);
        }
      } else {
        alert('Erro ao buscar Tweets', response.mensagem.texto);
      }
    };

    handleGetTweets();
  }, [refreshCheck]);

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
        setRefreshCheck={setRefreshCheck}
        handleLike={handleLike}
      />
      <div className="tweet-feed--section" id="right-section"></div>
    </div>
  );
}

export default FeedPage;
