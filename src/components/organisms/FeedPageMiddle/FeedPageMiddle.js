import FeedPageHeader from '../../molecules/FeedPageHeader/FeedPageHeader';
import PostInput from '../../molecules/PostInput/PostInput';
import styles from './style.module.scss';
import CommentCard from '../CommentCard/CommentCard';

function MiddleSection({
  handleLogout,
  tweetText,
  setTweetText,
  handlePostTweet,
  tweetData,
  setRefreshCheck,
  handleLike,
  handleOpenModal,
}) {
  return (
    <div className={styles['tweet-feed--section']}>
      <FeedPageHeader handleLogout={handleLogout} />
      <PostInput
        tweetText={tweetText}
        setTweetText={setTweetText}
        handlePostTweet={handlePostTweet}
        placeholder="O que está acontecendo?"
        buttonText="Postar"
        classNamePrefix="tweet-feed"
      />
      <div className={styles['tweet-feed--list']}>
        {tweetData.map((tweet) => (
          <CommentCard
            key={tweet.id}
            comment={tweet}
            setRefreshCheck={setRefreshCheck}
            handleLike={handleLike}
            handleOpenModal={handleOpenModal}
          ></CommentCard>
        ))}
      </div>
    </div>
  );
}

export default MiddleSection;
