import FeedPageHeader from '../../molecules/FeedPageHeader/FeedPageHeader';
import PostInput from '../../molecules/PostInput/PostInput';
import styles from './style.module.scss';

function MiddleSection({
  handleLogout,
  tweetText,
  setTweetText,
  handlePostTweet,
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
        <div className={styles['tweet-feed--card']}></div>
      </div>
    </div>
  );
}

export default MiddleSection;
