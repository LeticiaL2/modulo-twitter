import TextArea from '../../atoms/TextArea/TextArea';
import Button from '../../atoms/Button/Button';
import Image from '../../atoms/Image/Image';
import styles from './style.module.scss';

function PostInput({
  tweetText,
  setTweetText,
  handlePostTweet,
  placeholder,
  buttonText,
  imageSrc = '/user.png',
  noBorders,
}) {
  const cardClasses = noBorders
    ? `${styles['input-container']} ${styles['no-borders']}`
    : styles['input-container'];

  return (
    <div className={cardClasses}>
      <div className={styles['input-left']}>
        <Image variant="user-image" src={imageSrc} />
      </div>
      <div className={styles['input-right']}>
        <TextArea
          variant="input-textarea"
          placeholder={placeholder}
          value={tweetText}
          onChange={(event) => setTweetText(event.target.value)}
        ></TextArea>
        <Button
          variant="tweetFeedInput"
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
