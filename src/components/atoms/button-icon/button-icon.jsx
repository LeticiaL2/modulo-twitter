import React from 'react';
import { Button, Icon, CountContainer, IconContainer } from './styles';
import { FaRetweet} from 'react-icons/fa'; 
import {BsReply} from 'react-icons/bs'
import {MdFavoriteBorder} from 'react-icons/md'
import {TbBrandGoogleAnalytics} from 'react-icons/tb'
import {SlOptions} from 'react-icons/sl'
import {BiBookmark} from 'react-icons/bi'


function ButtonIcon({ iconType, count, $padding  }) {
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
    case 'option':
      iconComponent = <SlOptions />;
      break;
    case 'bookmark':
      iconComponent = <BiBookmark />;
      break;

    default:
      iconComponent = null;
  }

  return (
    <IconContainer>
        <Button $padding={$padding}>
        <Icon>{iconComponent}</Icon>
        </Button>
        <CountContainer >{count}</CountContainer>
    </IconContainer>
  );
}

export default ButtonIcon;