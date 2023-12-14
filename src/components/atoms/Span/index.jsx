import React from 'react'
import { Container } from './styles'

function Span(props) {
  return <Container {...props}>
    {props.children}
  </Container>
}

export default Span