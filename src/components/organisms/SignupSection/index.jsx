import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, FormContainer } from './styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { Api } from '../../../services/api';

function SignupSection() {
  const navigate = useNavigate();

  const [touched, setTouched] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  })
  

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

  const nameIsValid = name => {
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
      const request = await Api.post('/api/v1/usuarios', {
        email, senha: password, usuario: username, nome: name
      })
      navigate('/login');
      return request.data
    } catch (error) {
      setHttpError(error.response.data.mensagem.texto)
      return
    }
  }

  const handleNameInputChange = e => {
    setName(e.target.value)
    nameIsValid(e.target.value)
    setTouched({ ...touched, name: true });
  }

  const handleUsernameInputChange = e => {
    setUsername(e.target.value)
    usernameIsValid(e.target.value)
    setTouched({ ...touched, username: true });
  }

  const handleEmailInputChange = e => {
    setEmail(e.target.value)
    emailIsValid(e.target.value)
    setTouched({ ...touched, email: true });
  }

  const handlePasswordInputChange = e => {
    setPassword(e.target.value)
    passwordIsValid(e.target.value)
    setTouched({ ...touched, password: true });
  }

  const handleConfirmPasswordInputChange = e => {
    setConfirmPassword(e.target.value)
    confirmPasswordIsValid(e.target.value)
    setTouched({ ...touched, confirmPassword: true });
  }

  const isButtonDisabled = useMemo(() => {
    const validations = [
      touched.email && emailIsValid(email),
      touched.password && passwordIsValid(password),
      touched.username && usernameIsValid(username),
      touched.name && nameIsValid(name),
      touched.confirmPassword && confirmPasswordIsValid(confirmPassword),
    ];
    
    return !validations.every(Boolean)
  }, [email, password, username, name, confirmPassword, touched]);


  const handleSignup = async (e) => {
    e.preventDefault();

    if (!emailIsValid(email) && !passwordIsValid(password) && !usernameIsValid(username) && !nameIsValid(name) && !confirmPasswordIsValid(confirmPassword)) {
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

    if (!nameIsValid(name)) {
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
        <Button $fontSize="1.2rem" disabled={isButtonDisabled}>Criar conta</Button>
      </FormContainer>
      <p>
        Já possui uma conta? <Link to="/login">Faça login</Link>
      </p>
    </Container>
  );
}

export default SignupSection;
