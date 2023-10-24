import React from 'react';
import {
  TweetContainer,
  Header,
  Content,
  Footer,
  UserInfo,
  GrayContainer,
  DivDisplay,
  DateContainer,
} from './styles';
import MoreIcon from '../../atoms/SVGIcons/MoreIcon';
import DotIcon from '../../atoms/SVGIcons/DotIcon';
import UserPhoto from '../../atoms/UserPhoto';
import ListActions from '../ListActions';
import { format } from 'date-fns';

function MainTweet({ userData }) {
  const { content, date, user } = userData;
  // const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true })
  const hourFormatted = format(new Date(date), 'KK:mm a')
  const dateFormatted = format(new Date(date), 'LLL d, yyyy')

  return (
    <TweetContainer>
        <Header>
          <UserPhoto src={user.userphoto} />
          <DivDisplay>
          <UserInfo>
            <span>{user.name}</span>
            <GrayContainer>
              <span>@{user.username}</span>
            </GrayContainer>
          </UserInfo>
            <MoreIcon />
          </DivDisplay>
        </Header>
        <Content>
          {content}
        </Content>
        <Footer>
          <DateContainer>
            {hourFormatted} <DotIcon /> {dateFormatted}
            </DateContainer>
          <ListActions userData={userData} />
        </Footer>
    </TweetContainer>
  );
}

export default MainTweet;
