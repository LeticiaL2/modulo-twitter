import axios from 'axios';

export const registerUser = async (user) => {
    try {
        const response = await axios.post('http://localhost:3003/api/v1/usuarios', user);
        return response.data;
    } catch (error) {
        console.error(error);
        return { status: false, mensagem: { texto: error.message } };
    }
};
