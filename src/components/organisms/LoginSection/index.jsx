import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/auth'
import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import { Container, FormContainer } from './styles'
import { colors } from '../../../styles/colors'

function LoginSection() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const emailIsValid = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
  }


  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const [httpError, setHttpError] = useState(null)


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
    } else {
      setPasswordError('')
    }
  }

  const handleLogin = async (e) => {
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

    try {
      await login(email, password);
      navigate('/')
    } catch (error) {
      setHttpError('Invalid password or email.')
    }

  };

  return (
    <Container>
      <h1>Entrar no X</h1>
      <FormContainer onSubmit={handleLogin}>
        <Input
          $border="outline"
          type="email"
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
        <Button $fontSize="1.2rem" $backgroundColor={colors.white} $fontColor={colors.black} >Avançar</Button>
      </FormContainer>
      <p>
        Não tem uma conta? <Link to="/signup">Inscreva-se</Link>
      </p>
    </Container>
  );
}

export default LoginSection;
