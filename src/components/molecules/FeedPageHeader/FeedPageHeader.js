import Image from '../../atoms/Image/Image';
import Button from '../../atoms/Button/Button';
import styles from './style.module.scss';

function FeedPageHeader({ handleLogout }) {
  return (
    <div className={styles['feed-page--header']}>
      <Image src="x_icon.png" variant="tweet-feed--header-image" alt="Close" />
      <h4 className={styles['feed-page--h4']}>Feed</h4>
      <Button variant="tweetFeedHeader" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
}

export default FeedPageHeader;
