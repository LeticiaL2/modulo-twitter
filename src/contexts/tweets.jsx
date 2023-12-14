import React, { createContext, useState } from 'react';

export const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);

  const updateTweet = (updatedTweet) => {
    setTweets(tweets.map(tweet => tweet.id === updatedTweet.id ? updatedTweet : tweet));
  };

  return (
    <TweetContext.Provider value={{ tweets, updateTweet }}>
      {children}
    </TweetContext.Provider>
  );
};