import TweetHeader from '../../molecules/TweetHeader/TweetHeader';
import TweetFooter from '../../molecules/TweetFooter/TweetFooter';
import styles from './style.module.scss';
import { useState } from 'react';
import MoreModal from '../../molecules/MoreModal/MoreModal';

function MainCard({
  tweetData,
  handleMainTweetComment,
  handleMainTweetRetweet,
  handleMainTweetLike,
  setRefreshCheck,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMore = (event) => {
    if (event) event.preventDefault();
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles['main-card']}>
      <TweetHeader
        user={{ nome: tweetData.nome, usuario: tweetData.usuario }}
        handleMore={handleMore}
      />
      <div className={styles['main-card--content']}>{tweetData.texto}</div>
      <div className={styles['main-card--date']}>{tweetData.data}</div>
      <TweetFooter
        comments={tweetData.comentarios}
        retweets={tweetData.retweets}
        likes={tweetData.likes}
        liked={tweetData.liked}
        handleMainTweetComment={() => handleMainTweetComment(tweetData)}
        handleMainTweetRetweet={handleMainTweetRetweet}
        handleMainTweetLike={() =>
          handleMainTweetLike(tweetData.liked, tweetData.liked)
        }
      />
      {isModalOpen && (
        <MoreModal
          closeModal={handleMore}
          commentId={tweetData.id}
          setRefreshCheck={setRefreshCheck}
        />
      )}
    </div>
  );
}

export default MainCard;
