import axios from 'axios';
import { formatDate, formatDateForComments } from '../utils/dateUtils';

export const postTweet = async (tweetText) => {
  try {
    const response = await axios.post(
      'http://localhost:3003/api/v1/tweets',
      {
        texto: tweetText,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTweets = async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/v1/tweets', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const tweets = response.data;
    tweets.conteudo.forEach((tweet) => {
      tweet.data = formatDateForComments(tweet.data);
    });
    return tweets;
  } catch (error) {
    console.error('Erro ao buscar Tweets:', error);
  }
};

export const getTweetDetails = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/v1/tweets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    const tweetDetails = response.data;
    tweetDetails.conteudo.data = formatDate(tweetDetails.conteudo.data);

    tweetDetails.conteudo.comentariosLista.forEach((commentTweet) => {
      commentTweet.data = formatDateForComments(commentTweet.data);
    });

    return tweetDetails;
  } catch (error) {
    console.error('Erro ao buscar Tweets:', error);
  }
};

export const postComment = async (commentText, tweetId) => {
  try {
    const response = await axios.post(
      `http://localhost:3003/api/v1/tweets/${tweetId}/comentarios`,
      {
        texto: commentText,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const toggleLike = async (tweetId, liked) => {
  const url = `http://localhost:3003/api/v1/tweets/${tweetId}/likes`;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  let response;
  try {
    if (liked) {
      response = await axios.delete(url, { headers });
    } else {
      response = await axios.post(url, {}, { headers });
    }
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTweet = async (tweetId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3003/api/v1/tweets/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
