import React, { useState } from 'react';
import { registerUser } from '../../services/user';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SignUp = () => {
    const [user, setUser] = useState({
        nome: '',
        usuario: '',
        email: '',
        senha: ''
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await registerUser(user);
        console.log(response);
        setUser({
            nome: '',
            usuario: '',
            email: '',
            senha: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up to Tweeter</h1>
            <div>
                <Input 
                    type="text" 
                    name="nome" 
                    placeholder="Nome" 
                    onChange={handleChange}
                    value={user.nome}
                />
                <Input 
                    type="text" 
                    name="usuario" 
                    placeholder="Usuário" 
                    onChange={handleChange}
                    value={user.usuario}
                />
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
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default SignUp;
