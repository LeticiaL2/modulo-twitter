import Button from '../atoms/Button';
import CommentIcon from '../atoms/CommentIcon';
import LikeIcon from '../atoms/LikeIcon';
import RetweetIcon from '../atoms/RetweetIcon';

function CommentFooter({ comments, retweets, likes }) {
  return (
    <div className="comment-card--footer">
      <div className="comment-card--comment">
        <Button className="comment-card--comment-btn">
          <CommentIcon className="comment-card--comment-svg" />
        </Button>
        <span className="comment-card--comment-count">{comments}</span>
      </div>
      <div className="comment-card--retweet">
        <Button className="comment-card--retweet-btn">
          <RetweetIcon className="comment-card--retweet-svg" />
        </Button>
        <span className="comment-card--retweet-count">{retweets}</span>
      </div>
      <div className="comment-card--like">
        <Button className="comment-card--like-btn">
          <LikeIcon className="comment-card--like-svg" />
        </Button>
        <span className="comment-card--like-count">{likes}</span>
      </div>
    </div>
  );
}

export default CommentFooter;
