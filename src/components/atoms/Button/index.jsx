/* eslint-disable  */
import React from 'react';
import { Container } from './style';

function Button(props) {
  return <Container {...props}>
    {props.children}
  </Container>;
}

export default Button;