import axios from 'axios';

export const loginUser = async (user) => {
  const response = await axios.post('http://localhost:3003/api/v1/auth', user);

  return response.data;
};

export const signUpUser = async (user) => {
  try {
    const response = await axios.post(
      'http://localhost:3003/api/v1/usuarios',
      user,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorResponse = error.response.data.mensagem.texto;
      return { status: false, mensagem: errorResponse };
    } else {
      return { status: false, mensagem: { texto: error.message } };
    }
  }
};
