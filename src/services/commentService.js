import axios from 'axios';

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
