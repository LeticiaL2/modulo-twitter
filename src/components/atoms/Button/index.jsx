/* eslint-disable  */
import React from 'react';
import { Container } from './style';

function Button(props) {
  return <Container
  $bgColor={props.backgroundColor}
  $fontColor={props.fontColor}
  $fontSize={props.fontSize}
  $borderColor={props.borderColor}
  {...props}
    >
    {props.children}
  </Container>;
}

export default Button;
