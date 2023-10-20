import React from 'react';
import { Button, Icon, CountContainer, IconContainer } from './styles';
import { FaRetweet} from 'react-icons/fa'; 
import {BsReply} from 'react-icons/bs'
import {MdFavoriteBorder} from 'react-icons/md'
import {TbBrandGoogleAnalytics} from 'react-icons/tb'

function ButtonIcon({ iconType, count }) {
  let iconComponent;

  switch (iconType) {
    case 'reply':
      iconComponent = <BsReply />;
      break;
    case 'retweet':
      iconComponent = <FaRetweet />;
      break;
    case 'heart':
      iconComponent = <MdFavoriteBorder />;
      break;
    case 'eye':
      iconComponent = <TbBrandGoogleAnalytics />;
      break;
    default:
      iconComponent = null;
  }

  return (
    <IconContainer>
        <Button>
        <Icon>{iconComponent}</Icon>
        </Button>
        <CountContainer >{count}</CountContainer>
    </IconContainer>
  );
}

export default ButtonIcon;