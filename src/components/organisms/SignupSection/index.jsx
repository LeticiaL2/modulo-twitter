import React, { useState } from 'react'
import Input from '../../atoms/Input'
import { Container, FormContainer } from './styles'
import Button from '../../atoms/Button'
import { Link, useNavigate } from 'react-router-dom'


const SignupSection = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3004/signup', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      console.log('Erro ao cadastrar')
      return
    }

    navigate('/login')

  }

  return (
    <Container>
      <h1>Cadastre-se</h1>
      <FormContainer onSubmit={handleSignup}>
        <Input variant="outline" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input variant="outline" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="login">Avançar</Button>
      </FormContainer>
      <p>Já possui uma conta? <Link to="/login">Criar conta</Link></p>
    </Container>
  )
}

export default SignupSection