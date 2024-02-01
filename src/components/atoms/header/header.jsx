import React from "react";
import { HeaderContainer, ButtonContainer } from "./styles";
import { LogoX } from "./styles";
import ButtonFlag from "../button-flag/button-flag";

function Header({ onLngChange }) {
  return (
    <HeaderContainer>
      <LogoX></LogoX>
      <ButtonContainer>
        <ButtonFlag
          name="pt"
          iconType="brazil"
          onClick={() => onLngChange("pt")}
        />
        <ButtonFlag
          name="en"
          iconType="eua"
          onClick={() => onLngChange("en")}
        />
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
