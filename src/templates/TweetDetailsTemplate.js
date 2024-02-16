import BackArrowHeader from '../components/molecules/BackArrowHeader';
import PostInput from '../components/molecules/PostInput';
import CommentCard from '../components/organisms/CommentCard';
import MainCard from '../components/organisms/MainCard';

function TweetDetailsTemplate({
  tweetData,
  newCommentText,
  handlePostComment,
  setNewCommentText,
  handleMainTweetComment,
  handleMainTweetRetweet,
  handleMainTweetLike,
}) {
  return (
    <div className="tweet-details--container">
      <div className="tweet-details--section" id="left-section"></div>
      <div className="tweet-details--section" id="middle-section">
        <BackArrowHeader title="Tweet" />
        <MainCard
          tweetData={tweetData}
          handleMainTweetComment={handleMainTweetComment}
          handleMainTweetRetweet={handleMainTweetRetweet}
          handleMainTweetLike={handleMainTweetLike}
        />
        <PostInput
          tweetText={newCommentText}
          setTweetText={setNewCommentText}
          handlePostTweet={handlePostComment}
          placeholder="Postar sua resposta"
          buttonText="Responder"
          classNamePrefix="tweet-details"
        />
        <div className="tweet-details--comments-container">
          {tweetData.comentariosLista.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <div className="tweet-details--section" id="right-section"></div>
    </div>
  );
}

export default TweetDetailsTemplate;
