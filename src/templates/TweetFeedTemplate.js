import MiddleSection from '../components/organisms/TweetFeedMiddle';

function TweetFeedTemplate({
  handleLogout,
  tweetText,
  setTweetText,
  handlePostTweet,
}) {
  return (
    <div className="tweet-feed--container">
      <div className="tweet-feed--section" id="left-section"></div>
      <MiddleSection
        handleLogout={handleLogout}
        tweetText={tweetText}
        setTweetText={setTweetText}
        handlePostTweet={handlePostTweet}
      />
      <div className="tweet-feed--section" id="right-section"></div>
    </div>
  );
}

export default TweetFeedTemplate;
