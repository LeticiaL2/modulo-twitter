import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackArrowHeader from '../../components/molecules/BackArrowHeader/BackArrowHeader';
import PostInput from '../../components/molecules/PostInput/PostInput';
import CommentCard from '../../components/organisms/CommentCard/CommentCard';
import MainCard from '../../components/organisms/MainCard/MainCard';
import {
  getTweetDetails,
  postComment,
  toggleLike,
} from '../../services/tweetService';
import Loading from '../../components/atoms/Loading/Loading';
import './DetailsPage.scss';

function DetailsPage() {
  const [tweetData, setTweetData] = useState(null);
  const { id } = useParams();
  const [newCommentText, setNewCommentText] = useState('');
  const [refreshCheck, setRefreshCheck] = useState(false);

  useEffect(() => {
    const fetchTweet = async () => {
      const response = await getTweetDetails(id);

      if (response.status) {
        setTweetData(response.conteudo);
        if (refreshCheck) {
          setRefreshCheck(false);
        }
      } else {
        console.error('Erro ao buscar Tweets:', response.mensagem);
      }
    };

    fetchTweet();
  }, [id, refreshCheck]);

  if (!tweetData) {
    return Loading;
  }

  const handlePostComment = async () => {
    console.log('id:', id);
    const newComment = await postComment(newCommentText, id);
    setTweetData({
      ...tweetData,
      comentariosLista: [newComment, ...tweetData.comentariosLista],
    });
    setNewCommentText('');
    setRefreshCheck(true);
  };

  const handleMainTweetComment = async () => {
    console.log('Comment');
  };

  const handleMainTweetRetweet = async () => {
    console.log('Retweet');
  };

  const handleMainTweetLike = async (liked) => {
    const response = await toggleLike(id, liked);
    if (response.status) {
      setRefreshCheck(true);
    } else {
      console.error('Erro ao curtir Tweet:', response.mensagem);
    }
  };

  const handleCommentLike = async (id, liked) => {
    if (event) event.preventDefault();
    const response = await toggleLike(id, liked);
    if (response.status) {
      setRefreshCheck(true);
    } else {
      console.error('Erro ao curtir Tweet:', response.mensagem);
    }
  };

  return (
    <div className="tweet-details--container">
      <div className="tweet-details--section" id="left-section"></div>
      <div className="tweet-details--section" id="middle-section">
        <BackArrowHeader title="Tweet" />
        <MainCard
          tweetData={tweetData}
          handleMainTweetComment={handleMainTweetComment}
          handleMainTweetRetweet={handleMainTweetRetweet}
          handleMainTweetLike={handleMainTweetLike}
          setRefreshCheck={setRefreshCheck}
        />
        <PostInput
          tweetText={newCommentText}
          setTweetText={setNewCommentText}
          handlePostTweet={handlePostComment}
          placeholder="Postar sua resposta"
          buttonText="Responder"
          classNamePrefix="tweet-details"
        />
        <div className="tweet-details--comments-container">
          {tweetData.comentariosLista.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              setRefreshCheck={setRefreshCheck}
              handleLike={handleCommentLike}
            />
          ))}
        </div>
      </div>
      <div className="tweet-details--section" id="right-section"></div>
    </div>
  );
}

export default DetailsPage;
