import React, { useContext, useState } from 'react'
import Input from '../../atoms/Input'
import { Container, FormContainer } from './styles'
import Button from '../../atoms/Button'
import { AuthContext } from '../../../contexts/auth'
import { Link } from 'react-router-dom'

const LoginSection = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <Container>
      <h1>Entrar no X</h1>
      <FormContainer onSubmit={handleLogin}>
        <Input variant="outline" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input variant="outline" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="login">Login</Button>
      </FormContainer>
      <p>Não tem uma conta? <Link to="/signup">Inscreva-se</Link></p>
    </Container>
  )
}

export default LoginSection