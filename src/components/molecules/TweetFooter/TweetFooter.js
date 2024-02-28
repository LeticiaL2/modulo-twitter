import TweetAction from '../TweetAction/TweetAction';
import CommentIcon from '../../atoms/SVGIcons/CommentIcon/CommentIcon';
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon/RetweetIcon';
import LikeIcon from '../../atoms/SVGIcons/LikeIcon/LikeIcon';
import styles from './style.module.scss';
import UnlikedIcon from '../../atoms/SVGIcons/UnlikedIcon/UnlikedIcon';

const TweetFooter = ({
  comments,
  retweets,
  likes,
  liked,
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
    {liked ? (
      <TweetAction
        variant="main-card--like"
        actionCount={likes}
        IconComponent={LikeIcon}
        onClick={handleMainTweetLike}
      />
    ) : (
      <TweetAction
        variant="main-card--unliked"
        actionCount={likes}
        IconComponent={UnlikedIcon}
        onClick={handleMainTweetLike}
      />
    )}
  </div>
);

export default TweetFooter;
