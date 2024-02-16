import TweetAction from '../molecules/TweetAction';
import LikeIcon from '../atoms/LikeIcon';
import CommentIcon from '../atoms/CommentIcon';
import RetweetIcon from '../atoms/RetweetIcon';

const TweetFooter = ({
  comments,
  retweets,
  likes,
  handleMainTweetComment,
  handleMainTweetRetweet,
  handleMainTweetLike,
}) => (
  <div className="main-card--footer">
    <TweetAction
      className="main-card--comment"
      actionCount={comments}
      IconComponent={CommentIcon}
      onClick={handleMainTweetComment}
    />
    <TweetAction
      className="main-card--retweet"
      actionCount={retweets}
      IconComponent={RetweetIcon}
      onClick={handleMainTweetRetweet}
    />
    <TweetAction
      className="main-card--like"
      actionCount={likes}
      IconComponent={LikeIcon}
      onClick={handleMainTweetLike}
    />
  </div>
);

export default TweetFooter;
