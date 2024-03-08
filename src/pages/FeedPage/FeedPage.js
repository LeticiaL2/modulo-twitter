import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  postTweet,
  getTweets,
  toggleLike,
  postComment,
} from '../../services/tweetService';
import MiddleSection from '../../components/organisms/FeedPageMiddle/FeedPageMiddle';
import './FeedPage.scss';
import Loading from '../../components/atoms/Loading/Loading';
import InteractionModal from '../../components/organisms/InteractionModal/InteractionModal';

function FeedPage() {
  const navigate = useNavigate();
  const [tweetText, setTweetText] = useState('');
  const [tweetData, setTweetData] = useState(null);
  const [refreshCheck, setRefreshCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTweet, setCurrentTweet] = useState(null);
  const [commentText, setCommentText] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
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

  const handleComment = async () => {
    const response = await postComment(commentText, currentTweet.id);
    if (response.status) {
      setRefreshCheck(true);
    } else {
      alert('Erro ao comentar Tweet', response.mensagem.texto);
    }
    setCurrentTweet(null);
    setIsModalOpen(false);
  };

  const handleOpenModal = (comment) => {
    if (event) event.preventDefault();
    setCurrentTweet(comment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentTweet(null);
    setIsModalOpen(false);
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
        handleOpenModal={handleOpenModal}
      />
      <div className="tweet-feed--section" id="right-section"></div>
      <InteractionModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        comment={currentTweet}
        handleComment={handleComment}
        tweetText={commentText}
        setTweetText={setCommentText}
      />
    </div>
  );
}

export default FeedPage;
