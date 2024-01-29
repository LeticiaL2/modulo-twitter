import './TweetFeed.css';
import { useNavigate } from 'react-router-dom';
import { postTweet } from '../services/tweetService';
import { useState } from 'react';

function TweetFeedPageTemp() {
  const navigate = useNavigate();
  const [tweetText, setTweetText] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlePostTweet = async () => {
    const response = await postTweet(tweetText);
    if (response.status) {
      setTweetText('');
    } else {
      alert('Failed to post tweet', response.mensagem.texto);
    }
  };

  return (
    <div className="tweet-feed--container">
      <div className="tweet-feed--section" id="left-section"></div>
      <div className="tweet-feed--section" id="middle-section">
        <div className="tweet-feed--header">
          <img src="x_icon.png" />
          <h4>Feed</h4>
          <button onClick={handleLogout}> Sair </button>
        </div>

        <div className="tweet-feed--input">
          <div className="input-left">
            <img src="user.png" />
          </div>
          <div className="input-right">
            <textarea
              placeholder="O que está acontecendo?"
              value={tweetText}
              onChange={(event) => setTweetText(event.target.value)}
            ></textarea>
            <button onClick={handlePostTweet} disabled={tweetText.length === 0}>
              Postar
            </button>
          </div>
        </div>

        <div className="tweet-feed--list">
          <div className="tweet-feed--card"></div>
        </div>
      </div>
      <div className="tweet-feed--section" id="right-section"></div>
    </div>
  );
}

export default TweetFeedPageTemp;
