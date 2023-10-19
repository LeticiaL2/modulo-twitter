import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, FormContainer } from './styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { Api } from '../../../services/api';

function SignupSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('')

  const [httpError, setHttpError] = useState(null)

  const emailIsValid = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
  }

  const passwordIsValid = password => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password)
  }

  const SignUpRequest = async (email, password) => {
    try {
      const request = await Api.post('/signup', { email, password })
      navigate('/login');
      return request.data
    } catch (error) {
      setHttpError(error.response.data)
      return
    }
  }

  const handleEmailInputChange = e => {
    setEmail(e.target.value)
    if (e.target.value.trim() === '') {
      setEmailError('Email must not be empty.')
    } else if (!emailIsValid(e.target.value)) {
      setEmailError('Please enter a valid email.')
    } else {
      setEmailError('')
    }
  }
  
  const handlePasswordInputChange = e => {
    setPassword(e.target.value)
    if (e.target.value.trim() === '') {
      setPasswordError('Password must not be empty.')
    } else if (!passwordIsValid(e.target.value)) {
      setPasswordError('Password must contain at least 8 characters, one letter and one number.')
    } else {
      setPasswordError('')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email.trim() === '' && password.trim() === '') {
      setEmailError('Email must not be empty.')
      setPasswordError('Password must not be empty.')
      return
    }

    if (email.trim() === '') {
      setEmailError('Email must not be empty.')
      return
    }

    if (password.trim() === '') {
      setPasswordError('Password must not be empty.')
      return;
    }

    await SignUpRequest(email, password);
  };


  return (
    <Container>
      <h1>Inscreva-se hoje</h1>
      <FormContainer onSubmit={handleSignup}>
        <Input
          $border="outline"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailInputChange}
        />
        {emailError && <p className='error-text'>{emailError}</p>}
        <Input
          $border="outline"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordInputChange}
        />
        {passwordError && <p className='error-text'>{passwordError}</p>}
        {httpError && <p className='error-text'>{httpError}</p>}
        <Button $fontSize="1.2rem">Criar conta</Button>
      </FormContainer>
      <p>
        Já possui uma conta? <Link to="/login">Faça login</Link>
      </p>
    </Container>
  );
}

export default SignupSection;
