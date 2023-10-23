import React, { useState } from 'react';
import {
  TweetContainer,
  Body,
  Header,
  Content,
  Footer,
  UserInfo,
  GrayContainer,
} from './styles';
import MoreIcon from '../../atoms/SVGIcons/MoreIcon';
import DotIcon from '../../atoms/SVGIcons/DotIcon';
import UserPhoto from '../../atoms/UserPhoto';
import ListActions from '../ListActions';
import { formatDistanceToNow } from 'date-fns';

function Tweet({ userData }) {
  const [showMore, setShowMore] = useState(false);
  const { content, date, user } = userData;

  const text = content.length > 150 ? 
                  showMore ? 
                    content : content.slice(0, 147).concat('...') :
                    content 

  

  const handleShow = () => {
    setShowMore(!showMore);
  }

  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true })


  return (
    <TweetContainer>
      <UserPhoto src={user.userphoto} />
      <Body>
        <Header>
          <UserInfo>
            <span>{user.name}</span>
            <GrayContainer>
              <span>@{user.username}</span>
              <DotIcon />
              <span>{formattedDate}</span>
            </GrayContainer>
          </UserInfo>
          <MoreIcon />
        </Header>
        <Content>
          {text}
          {text.length === 150 && !showMore && <span onClick={handleShow}>Show more</span>}
          {text.length > 150 && showMore && <span onClick={handleShow}>Show Less</span>}
        </Content>
        <Footer>
          <ListActions userData={userData} />
        </Footer>
      </Body>
    </TweetContainer>
  );
}

export default Tweet;
