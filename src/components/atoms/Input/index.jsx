import React from 'react';
import { Container } from './style';

function Input(props) {
  return <Container border={props.border} {...props} />;
}

export default Input;
