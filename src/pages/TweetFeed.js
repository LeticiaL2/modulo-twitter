import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TweetFeedPage() {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3003/api/v1/tweets',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        setTweets(response.data.conteudo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      <h1>Tweet Feeds Page</h1>
      {tweets &&
        tweets.map((tweet, index) => (
          <div key={index}>
            <h2>{tweet.texto}</h2>
            <p>{tweet.usuario}</p>
          </div>
        ))}
    </div>
  );
}

export default TweetFeedPage;
