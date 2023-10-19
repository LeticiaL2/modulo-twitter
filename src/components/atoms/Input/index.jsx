import React, { useState } from 'react';
import { Container, Field, PasswordIcon } from './style';
import { BiShowAlt, BiHide } from 'react-icons/bi';

function Input(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Field>
      <Container $border={props.border} {...props} type={showPassword && props.type === 'password' ? 'text' : props.type}  />
      <PasswordIcon>
      {props.type === 'password' ? (
        showPassword ? (
          <BiHide onClick={handleShowPassword} />
        ) : (
          <BiShowAlt onClick={handleShowPassword} />
        )
      )
        : null
      }
      </PasswordIcon>
    </Field>
  )
}

export default Input;

