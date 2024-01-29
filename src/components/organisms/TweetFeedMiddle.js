import Header from '../molecules/TweetFeedHeader';
import Input from '../molecules/TweetFeedInput';

function MiddleSection({
  handleLogout,
  tweetText,
  setTweetText,
  handlePostTweet,
}) {
  return (
    <div className="tweet-feed--section" id="middle-section">
      <Header handleLogout={handleLogout} />
      <Input
        tweetText={tweetText}
        setTweetText={setTweetText}
        handlePostTweet={handlePostTweet}
      />
      <div className="tweet-feed--list">
        <div className="tweet-feed--card"></div>
      </div>
    </div>
  );
}

export default MiddleSection;
