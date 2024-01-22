import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SignIn = () => {
    const [user, setUser] = useState({
        email: '',
        senha: ''
    });
    
    const navigate = useNavigate();

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        AuthService.login(user)
            .then(() => {
                navigate('/feed');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In to Tweeter</h1>
            <div className='input-container'>
                <Input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange}
                    value={user.email}
                />
                <Input 
                    type="password" 
                    name="senha" 
                    placeholder="Senha" 
                    onChange={handleChange}
                    value={user.senha}
                />
            </div>
            <Button type="submit">Sign In</Button>
        </form>
    );
};

export default SignIn;
