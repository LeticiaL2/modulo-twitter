import Header from '../molecules/TweetFeedHeader';
import PostInput from '../molecules/PostInput';

function MiddleSection({
  handleLogout,
  tweetText,
  setTweetText,
  handlePostTweet,
}) {
  return (
    <div className="tweet-feed--section" id="middle-section">
      <Header handleLogout={handleLogout} />
      <PostInput
        tweetText={tweetText}
        setTweetText={setTweetText}
        handlePostTweet={handlePostTweet}
        placeholder="O que está acontecendo?"
        buttonText="Postar"
        classNamePrefix="tweet-feed"
      />
      <div className="tweet-feed--list">
        <div className="tweet-feed--card"></div>
      </div>
    </div>
  );
}

export default MiddleSection;
