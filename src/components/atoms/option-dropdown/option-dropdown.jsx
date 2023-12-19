import React from "react";
import { Container, Icon, Text } from "./styles";
import { LuPenLine } from "react-icons/lu";
import { FaRetweet } from "react-icons/fa";

const OptionDropdown = (props) => {
  const { iconType, onClick } = props;
  let iconComponent;

  const handleClick = () => {
    onClick();
  };

  switch (iconType) {
    case "Quote":
      iconComponent = <LuPenLine />;
      break;
    case "Retweet":
      iconComponent = <FaRetweet />;
      break;
    default:
      iconComponent = null;
  }

  return (
    <Container onClick={handleClick}>
      <Icon>{iconComponent}</Icon>
      <Text>{props.children}</Text>
    </Container>
  );
};

export default OptionDropdown;
