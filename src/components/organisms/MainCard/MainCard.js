import TweetHeader from '../../molecules/TweetHeader/TweetHeader';
import TweetFooter from '../../molecules/TweetFooter/TweetFooter';
import styles from './style.module.scss';

function MainCard({
  tweetData,
  handleMainTweetComment,
  handleMainTweetRetweet,
  handleMainTweetLike,
}) {
  return (
    <div className={styles['main-card']}>
      <TweetHeader
        user={{ nome: tweetData.nome, usuario: tweetData.usuario }}
      />
      <div className={styles['main-card--content']}>{tweetData.texto}</div>
      <div className={styles['main-card--date']}>{tweetData.data}</div>
      <TweetFooter
        comments={tweetData.comentarios}
        retweets={tweetData.retweets}
        likes={tweetData.likes}
        handleMainTweetComment={handleMainTweetComment}
        handleMainTweetRetweet={handleMainTweetRetweet}
        handleMainTweetLike={handleMainTweetLike}
      />
    </div>
  );
}

export default MainCard;
