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

export const toggleLike = async (tweetId, action) => {
  if (action === 'like') {
    try {
      const response = await axios.post(
        `http://localhost:3003/api/v1/tweets/${tweetId}/likes`,
        {},
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
  } else {
    try {
      const response = await axios.delete(
        `http://localhost:3003/api/v1/tweets/${tweetId}/likes`,
        {},
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
  }
};
