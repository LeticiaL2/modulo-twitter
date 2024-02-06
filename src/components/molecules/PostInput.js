import Textarea from '../atoms/Textarea';
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
        <Textarea
          className={`${classNamePrefix}--input-textarea`}
          placeholder={placeholder}
          value={tweetText}
          onChange={(event) => setTweetText(event.target.value)}
        ></Textarea>
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
