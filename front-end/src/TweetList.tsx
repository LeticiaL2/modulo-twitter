// React component to display a list of tweets
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of a tweet
interface Tweet {
  id: number;
  message: string;
}

function TweetList() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    axios.get<Tweet[]>('http://localhost:3000/api/tweets')
      .then(response => setTweets(response.data))
      .catch(error => console.error('Error fetching tweets:', error));
  }, []);
console.log(tweets)
  return (
    <div>
      <h2>Tweet List</h2>
      <ul>
        {tweets.map(tweet => (
          <li key={tweet.id}>{tweet.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default TweetList;
