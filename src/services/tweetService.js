import axios from 'axios';

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
