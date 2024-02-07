import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';
import Image from '../atoms/Image';

function PostInput({
  tweetText,
  setTweetText,
  handlePostTweet,
  placeholder,
  buttonText,
  imageSrc = '/user.png',
  classNamePrefix,
}) {
  return (
    <div className={`${classNamePrefix}--input-container`}>
      <div className={`${classNamePrefix}--input-left`}>
        <Image
          className={`${classNamePrefix}--input-user-image`}
          src={imageSrc}
        />
      </div>
      <div className={`${classNamePrefix}--input-right`}>
        <TextArea
          className={`${classNamePrefix}--input-textarea`}
          placeholder={placeholder}
          value={tweetText}
          onChange={(event) => setTweetText(event.target.value)}
        ></TextArea>
        <Button
          className={`${classNamePrefix}--input-button`}
          onClick={handlePostTweet}
          disabled={tweetText.length === 0}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default PostInput;
