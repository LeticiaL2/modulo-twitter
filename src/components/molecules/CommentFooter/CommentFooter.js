import CommentIcon from '../../atoms/SVGIcons/CommentIcon/CommentIcon';
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon/RetweetIcon';
import LikeIcon from '../../atoms/SVGIcons/LikeIcon/LikeIcon';
import TweetAction from '../TweetAction/TweetAction';
import styles from './style.module.scss';
import UnlikedIcon from '../../atoms/SVGIcons/UnlikedIcon/UnlikedIcon';

function CommentFooter({
  comments,
  retweets,
  likes,
  liked,
  handleLike,
  handleComment,
  handleRetweet,
}) {
  return (
    <div className={styles['comment-card--footer']}>
      <TweetAction
        variant="comment-card--comment"
        actionCount={comments}
        IconComponent={CommentIcon}
        onClick={handleComment}
      />
      {liked ? (
        <TweetAction
          variant="comment-card--like"
          actionCount={likes}
          IconComponent={LikeIcon}
          onClick={handleLike}
        />
      ) : (
        <TweetAction
          variant="comment-card--unliked"
          actionCount={likes}
          IconComponent={UnlikedIcon}
          onClick={handleLike}
        />
      )}
      <TweetAction
        variant="comment-card--retweet"
        actionCount={retweets}
        IconComponent={RetweetIcon}
        onClick={handleRetweet}
      />
    </div>
  );
}

export default CommentFooter;
