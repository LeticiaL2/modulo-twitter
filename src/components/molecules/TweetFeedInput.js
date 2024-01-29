import Textarea from '../atoms/Textarea';
import Button from '../atoms/Button';
import Image from '../atoms/Image';

function Input({ tweetText, setTweetText, handlePostTweet }) {
  return (
    <div className="tweet-feed--input">
      <div className="input-left">
        <Image src="user.png" alt="User" />
      </div>
      <div className="input-right">
        <Textarea
          placeholder="O que está acontecendo?"
          value={tweetText}
          onChange={(event) => setTweetText(event.target.value)}
        ></Textarea>
        <Button onClick={handlePostTweet} disabled={tweetText.length === 0}>
          Postar
        </Button>
      </div>
    </div>
  );
}

export default Input;
