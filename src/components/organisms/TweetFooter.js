import TweetAction from '../molecules/TweetAction';
import LikeIcon from '../atoms/LikeIcon';
import CommentIcon from '../atoms/CommentIcon';
import RetweetIcon from '../atoms/RetweetIcon';

const TweetFooter = ({ comments, retweets, likes }) => (
  <div className="main-card--footer">
    <TweetAction
      className="main-card--comment"
      actionCount={comments}
      IconComponent={CommentIcon}
    />
    <TweetAction
      className="main-card--retweet"
      actionCount={retweets}
      IconComponent={RetweetIcon}
    />
    <TweetAction
      className="main-card--like"
      actionCount={likes}
      IconComponent={LikeIcon}
    />
  </div>
);

export default TweetFooter;
