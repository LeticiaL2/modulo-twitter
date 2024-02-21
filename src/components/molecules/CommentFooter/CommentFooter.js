import CommentIcon from '../../atoms/SVGIcons/CommentIcon/CommentIcon';
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon/RetweetIcon';
import LikeIcon from '../../atoms/SVGIcons/LikeIcon/LikeIcon';
import TweetAction from '../TweetAction/TweetAction';
import styles from './style.module.scss';

function CommentFooter({ comments, retweets, likes }) {
  return (
    <div className={styles['comment-card--footer']}>
      <TweetAction
        variant="comment-card--comment"
        actionCount={comments}
        IconComponent={CommentIcon}
      />
      <TweetAction
        variant="comment-card--like"
        actionCount={likes}
        IconComponent={LikeIcon}
      />
      <TweetAction
        variant="comment-card--retweet"
        actionCount={retweets}
        IconComponent={RetweetIcon}
      />
    </div>
  );
}

export default CommentFooter;
