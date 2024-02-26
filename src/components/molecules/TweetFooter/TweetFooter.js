import TweetAction from '../TweetAction/TweetAction';
import CommentIcon from '../../atoms/SVGIcons/CommentIcon/CommentIcon';
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon/RetweetIcon';
import LikeIcon from '../../atoms/SVGIcons/LikeIcon/LikeIcon';
import styles from './style.module.scss';

const TweetFooter = ({
  comments,
  retweets,
  likes,
  handleMainTweetComment,
  handleMainTweetRetweet,
  handleMainTweetLike,
}) => (
  <div className={styles['main-card--footer']}>
    <TweetAction
      variant="main-card--comment"
      actionCount={comments}
      IconComponent={CommentIcon}
      onClick={handleMainTweetComment}
    />
    <TweetAction
      variant="main-card--retweet"
      actionCount={retweets}
      IconComponent={RetweetIcon}
      onClick={handleMainTweetRetweet}
    />
    <TweetAction
      variant="main-card--like"
      actionCount={likes}
      IconComponent={LikeIcon}
      onClick={handleMainTweetLike}
    />
  </div>
);

export default TweetFooter;
