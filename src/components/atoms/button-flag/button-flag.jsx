import React from "react";
import { Button, Icon, IconContainer } from "./styles";
import { GiBrazilFlag } from "react-icons/gi";
import { LiaFlagUsaSolid } from "react-icons/lia";

function ButtonFlag({ iconType, $padding, onClick, $color }) {
  let iconComponent;

  switch (iconType) {
    case "brazil":
      iconComponent = <GiBrazilFlag />;
      break;
    case "eua":
      iconComponent = <LiaFlagUsaSolid />;
      break;

    default:
      iconComponent = null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <IconContainer>
      <Button onClick={handleClick}>
        <Icon>{iconComponent}</Icon>
      </Button>
    </IconContainer>
  );
}

export default ButtonFlag;
