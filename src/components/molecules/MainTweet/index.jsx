import { format } from 'date-fns';
import React, { useState } from 'react';
import { colors } from '../../../styles/colors';
import DotIcon from '../../atoms/SVGIcons/DotIcon';
import MoreIcon from '../../atoms/SVGIcons/MoreIcon';
import Span from '../../atoms/Span';
import UserPhoto from '../../atoms/UserPhoto';
import ListActions from '../ListActions';
import {
  Content,
  DateContainer,
  DivDisplay,
  Footer,
  HeaderContainer,
  RetweetContainer,
  TweetContainer,
  UserInfoContainer
} from './styles';
import BodyTweet from '../BodyTweet';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';

function MainTweet({ userData }) {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const {id: tweetId, texto: content, data: date, nome, usuario, isLikedByUser, isRetweetedByUser, retweetPai } = userData;
  const hourFormatted = format(new Date(date), 'KK:mm a')
  const dateFormatted = format(new Date(date), 'LLL d, yyyy')



  const handleRetweetLink = (e) => {
    e.stopPropagation()
    navigate(`/tweet/${retweetPai.id}`)
  }

  const handleOpenModal = async (e) => {
    setOpenModal(true)
  }

  return (
    <TweetContainer>
      <HeaderContainer>
        <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
        <DivDisplay>
          <UserInfoContainer>
            <Span>{nome}</Span>
              <Span $fontColor={colors.light_gray}>@{usuario}</Span>
          </UserInfoContainer>
          <MoreIcon />
        </DivDisplay>
      </HeaderContainer>
      <Content>
        {content}
        {retweetPai && <RetweetContainer onClick={handleRetweetLink}>
          <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" $width="20px" $height="20px" />
          <BodyTweet userData={retweetPai} />
        </RetweetContainer>
        }
      </Content>
      <Footer>
        <DateContainer>
          {hourFormatted} <DotIcon /> {dateFormatted}
        </DateContainer>
        <ListActions onClickModal={handleOpenModal} comentarios={userData.comentarios} likes={userData.likes} isLikedByUser={isLikedByUser} retweets={userData.retweets} isRetweetedByUser={isRetweetedByUser} tweetId={tweetId}/>
        <Modal userData={userData} isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
          <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
          <BodyTweet userData={userData} />
        </Modal>
      </Footer>
    </TweetContainer>
  );
}

export default MainTweet;
