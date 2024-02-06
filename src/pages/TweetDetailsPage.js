import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TweetDetailsPage.scss';
import { getTweetDetails, postComment } from '../services/tweetService';
import Loading from '../components/atoms/Loading';
import TweetDetailsTemplate from '../templates/TweetDetailsTemplate';

function TweetDetailsPage() {
  const [tweetData, setTweetData] = useState(null);
  const { id } = useParams();
  const [newCommentText, setNewCommentText] = useState('');
  const [commentPosted, setCommentPosted] = useState(false);

  useEffect(() => {
    const fetchTweet = async () => {
      const response = await getTweetDetails(id);

      if (response.status) {
        setTweetData(response.conteudo);
        if (commentPosted) {
          setCommentPosted(false);
        }
      } else {
        console.error('Erro ao buscar Tweets:', response.mensagem);
      }
    };

    fetchTweet();
  }, [id, commentPosted]);

  if (!tweetData) {
    return Loading;
  }

  const handlePostComment = async () => {
    const newComment = await postComment(newCommentText, id);
    setTweetData({
      ...tweetData,
      comentariosLista: [newComment, ...tweetData.comentariosLista],
    });
    setNewCommentText('');
    setCommentPosted(true);
  };

  return (
    <TweetDetailsTemplate
      tweetData={tweetData}
      newCommentText={newCommentText}
      handlePostComment={handlePostComment}
      setNewCommentText={setNewCommentText}
    />
  );
}

export default TweetDetailsPage;
