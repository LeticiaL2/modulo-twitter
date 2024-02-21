import TweetAction from './TweetAction';
import CommentIcon from '../atoms/SVGIcons/CommentIcon/CommentIcon';
import RetweetIcon from '../atoms/SVGIcons/RetweetIcon/RetweetIcon';
import LikeIcon from '../atoms/SVGIcons/LikeIcon/LikeIcon';
import styles from './style.module.css';

const ActionFooter = ({
  comments,
  retweets,
  likes,
  handleComment,
  handleRetweet,
  handleLike,
  className,
}) => (
  <div className={`${styles.footer} ${className}`}>
    <TweetAction
      className={`${styles.comment}`}
      actionCount={comments}
      IconComponent={CommentIcon}
      onClick={handleComment}
    />
    <TweetAction
      className={`${styles.retweet}`}
      actionCount={retweets}
      IconComponent={RetweetIcon}
      onClick={handleRetweet}
    />
    <TweetAction
      className={`${styles.like}`}
      actionCount={likes}
      IconComponent={LikeIcon}
      onClick={handleLike}
    />
  </div>
);

export default ActionFooter;
