import React from "react";
import { Button, Icon, CountContainer, IconContainer } from "./styles";
import { FaRetweet } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { SlOptions } from "react-icons/sl";
import { BiBookmark } from "react-icons/bi";
import { IoMdHeart } from "react-icons/io";

function ButtonIcon({ iconType, count, $padding, onClick, $color }) {
  let iconComponent;

  switch (iconType) {
    case "reply":
      iconComponent = <BsReply />;
      break;
    case "retweet":
      iconComponent = <FaRetweet />;
      break;
    case "heart":
      iconComponent = <MdFavoriteBorder />;
      break;

    case "heart-filled":
      iconComponent = <IoMdHeart />;
      break;

    case "eye":
      iconComponent = <TbBrandGoogleAnalytics />;
      break;
    case "option":
      iconComponent = <SlOptions />;
      break;
    case "bookmark":
      iconComponent = <BiBookmark />;
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
      <Button $color={$color} $padding={$padding} onClick={handleClick}>
        <Icon $color={$color}>{iconComponent}</Icon>
      </Button>
      <CountContainer>{count}</CountContainer>
    </IconContainer>
  );
}

export default ButtonIcon;
