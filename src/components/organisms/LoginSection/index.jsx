import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { Container, FormContainer } from './styles';
import { colors } from '../../../styles/colors';

function LoginSection() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Container>
      <h1>Entrar no X</h1>
      <FormContainer onSubmit={handleLogin}>
        <Input
          border="outline"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          border="outline"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fontSize="1.2rem" backgroundColor={colors.white} fontColor={colors.black} >Avançar</Button>
      </FormContainer>
      <p>
        Não tem uma conta? <Link to="/signup">Inscreva-se</Link>
      </p>
    </Container>
  );
}

export default LoginSection;
