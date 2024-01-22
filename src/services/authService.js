import axios from 'axios';

const API_URL = 'http://localhost:3003/api/v1/auth';

class AuthService {
    login(user) {
        return axios
            .post(API_URL, {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

const authService = new AuthService();
export default authService;
