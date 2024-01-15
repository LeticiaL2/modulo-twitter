import React from 'react'
import { Container } from './styles'

function AuthTemplate({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default AuthTemplate