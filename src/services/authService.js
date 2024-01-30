import axios from 'axios';

export const loginUser = async (user) => {
  try {
    const response = await axios.post(
      'http://localhost:3003/api/v1/auth',
      user,
    );

    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorResponse = error.response.data.message;
      const statusCode = error.response.data.statusCode;
      return { status: false, statusCode: statusCode, mensagem: errorResponse };
    } else {
      return { status: false, mensagem: { texto: error.message } };
    }
  }
};
