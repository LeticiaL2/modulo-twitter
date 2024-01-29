import React from "react";
import { ButtonStyled } from "./styles";
import { ContainerButton } from "./styles";

function Button(props) {
  const { $backgroundColor, $color, $fontSize, $border, $width, onClick } =
    props;

  return (
    <ContainerButton>
      <ButtonStyled
        $backgroundColor={$backgroundColor}
        $color={$color}
        $fontSize={$fontSize}
        $border={$border}
        $width={$width}
        onClick={onClick}
        disabled={props.disabled}
      >
        {props.$text}
      </ButtonStyled>
    </ContainerButton>
  );
}

export default Button;
