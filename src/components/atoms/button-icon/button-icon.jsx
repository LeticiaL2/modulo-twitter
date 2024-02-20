import React from "react";
import {
  Button,
  Icon,
  IconContainer,
  Content,
  Count,
  StyledBsReply,
  StyledFaRetweet,
  StyledMdFavoriteBorder,
  StyledTbBrandGoogleAnalytics,
  StyledSlOptions,
  StyledIoMdHeart,
  StyledGoHomeFill,
  StyledIoMdSearch,
  StyledIoIosNotifications,
  StyledFaEnvelope,
  StyledMdBookmarks,
  StyledIoIosListBox,
  StyledIoMdPeople,
  StyledFaXTwitter,
  StyledCgProfile,
  StyledCiCircleMore,
  StyledPiMoneyBold,
  StyledBsArrowUpRightSquareFill,
  StyledCiSettings,
  StyledTbLogout,
} from "./styles";

function ButtonIcon({ iconType, count, $padding, onClick, $color, content }) {
  let iconComponent;

  switch (iconType) {
    case "reply":
      iconComponent = <StyledBsReply />;
      break;
    case "retweet":
      iconComponent = <StyledFaRetweet />;
      break;
    case "heart":
      iconComponent = <StyledMdFavoriteBorder />;
      break;
    case "heart-filled":
      iconComponent = <StyledIoMdHeart />;
      break;
    case "eye":
      iconComponent = <StyledTbBrandGoogleAnalytics />;
      break;
    case "option":
      iconComponent = <StyledSlOptions />;
      break;
    case "bookmark":
      iconComponent = <StyledMdBookmarks />;
      break;
    case "home":
      iconComponent = <StyledGoHomeFill />;
      break;
    case "explore":
      iconComponent = <StyledIoMdSearch />;
      break;
    case "notification":
      iconComponent = <StyledIoIosNotifications />;
      break;
    case "message":
      iconComponent = <StyledFaEnvelope />;
      break;
    case "list":
      iconComponent = <StyledIoIosListBox />;
      break;
    case "profile":
      iconComponent = <StyledCgProfile />;
      break;
    case "more":
      iconComponent = <StyledCiCircleMore />;
      break;
    case "communities":
      iconComponent = <StyledIoMdPeople />;
      break;
    case "XTwitter":
      iconComponent = <StyledFaXTwitter />;
      break;

    case "monetization":
      iconComponent = <StyledPiMoneyBold />;
      break;

    case "ads":
      iconComponent = <StyledBsArrowUpRightSquareFill />;
      break;

    case "settings":
      iconComponent = <StyledCiSettings />;
      break;

    case "logout":
      iconComponent = <StyledTbLogout />;
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
        <Content>{content}</Content>
        <Count>{count}</Count>
      </Button>
    </IconContainer>
  );
}

export default ButtonIcon;
