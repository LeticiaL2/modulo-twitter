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

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('')

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('')

  const [httpError, setHttpError] = useState(null)

  const emailIsValid = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (email.trim() === '') {
      setEmailError('Email must not be empty.')
      return false
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email.')
      return false
    } else {
      setEmailError('')
      return true
    }
  }

  const passwordIsValid = password => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (password.trim() === '') {
      setPasswordError('Password must not be empty.')
      return false
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, one letter and one number.')
      return false
    } else {
      setPasswordError('')
      return true
    }
  }

  const confirmPasswordIsValid = confirmPassword => {
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Password must not be empty.')
      return false
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Password must be equal.')
      return false
    } else {
      setConfirmPasswordError('')
      return true
    }
  }

  const usernameIsValid = username => {
    const usernameRegex = /^[a-zA-Z0-9_]{4,15}$/
    if (username.trim() === '') {
      setUsernameError('Username must not be empty.')
      return false
    } else if (!usernameRegex.test(username)) {
      setUsernameError('Username must contain at least 4 characters and max 15 characters and only contain numbers, letters and "_"')
      return false
    } else {
      setUsernameError('')
      return true
    }
  }

  const nameisValid = name => {
    const nameRegex = /^[A-Za-z\s'-]{1,50}$/
    if (name.trim() === '') {
      setNameError('Name must not be empty.')
      return false
    } else if (!nameRegex.test(name)) {
      setNameError('Name must contain at least 1 character and max 50 characters')
      return false
    } else {
      setNameError('')
      return true
    }
  }

  const SignUpRequest = async (email, password) => {
    try {
      const request = await Api.post('/signup', {
        email, password, username, name, userphoto:
          'data:image/png;base64,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'
      })
      navigate('/login');
      return request.data
    } catch (error) {
      setHttpError(error.response.data)
      return
    }
  }

  const handleNameInputChange = e => {
    setName(e.target.value)
    nameisValid(e.target.value)
  }

  const handleUsernameInputChange = e => {
    setUsername(e.target.value)
    usernameIsValid(e.target.value)
  }

  const handleEmailInputChange = e => {
    setEmail(e.target.value)
    emailIsValid(e.target.value)
  }

  const handlePasswordInputChange = e => {
    setPassword(e.target.value)
    passwordIsValid(e.target.value)
  }

  const handleConfirmPasswordInputChange = e => {
    setConfirmPassword(e.target.value)
    confirmPasswordIsValid(e.target.value)
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!emailIsValid(email) && !passwordIsValid(password) && !usernameIsValid(username) && !nameisValid(name) && !confirmPasswordIsValid(confirmPassword)) {
      return
    }

    if (!emailIsValid(email)) {
      return
    }
    if (!passwordIsValid(password)) {
      return
    }

    if (!usernameIsValid(username)) {
      return
    }

    if (!nameisValid(name)) {
      return
    }

    if (!confirmPasswordIsValid(confirmPassword)) {
      return
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
          placeholder="Name"
          value={name}
          onChange={handleNameInputChange}
        />
        {nameError && <p className='error-text'>{nameError}</p>}
        <Input
          $border="outline"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameInputChange}
        />
        {usernameError && <p className='error-text'>{usernameError}</p>}
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
        <Input
          $border="outline"
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={handleConfirmPasswordInputChange}
        />
        {confirmPasswordError && <p className='error-text'>{confirmPasswordError}</p>}

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
