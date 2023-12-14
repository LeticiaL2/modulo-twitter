import React from 'react'
import { Container } from './styles'
import Span from '../Span'

const DropdownItem = (props) => {
  return (
    <Container {...props}>
      <div>{props.icon}</div>
      <Span>{props.children}</Span>
    </Container>
  )
}

export default DropdownItem