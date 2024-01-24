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
    console.error(error);
    return { status: false, mensagem: { texto: error.message } };
  }
};
