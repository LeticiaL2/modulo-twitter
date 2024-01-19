import { format } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../styles/colors';
import DotIcon from '../../atoms/SVGIcons/DotIcon';
import MoreIcon from '../../atoms/SVGIcons/MoreIcon';
import Span from '../../atoms/Span';
import UserPhoto from '../../atoms/UserPhoto';
import BodyTweet from '../../molecules/BodyTweet';
import ListActions from '../../organisms/ListActions';
// import Modal from '../Modal';
import Modal from '../../templates/ModalTemplate'
import {
  Content,
  DateContainer,
  DivDisplayContainer,
  Footer,
  HeaderContainer,
  RetweetContainer,
  TweetContainer,
  UserInfoContainer
} from './styles';
import ReplyTweet from '../../molecules/ReplyTweet';

function MainTweet({ userData, refreshList, updateTweets, handleAddComment, openCommentModalId, setOpenCommentModalId }) {
  const [openRetweetModal, setOpenRetweetModal] = useState(false)
  const navigate = useNavigate()
  const { id: tweetId, texto: content, data: date, nome, usuario, isLikedByUser, isRetweetedByUser, isRetweetedWithoutQuoteByUser, retweetPai } = userData;
  const hourFormatted = format(new Date(date), 'KK:mm a')
  const dateFormatted = format(new Date(date), 'LLL d, yyyy')


  const handleRetweetLink = (e) => {
    e.stopPropagation()
    navigate(`/tweet/${retweetPai.id}`)
  }

  const handleLikeListUpdate = (isLikedByUser, likes) => {
    const updatedTweet = {
      ...userData,
      isLikedByUser: !isLikedByUser,
      likes: isLikedByUser ? likes - 1 : likes + 1
    }
    updateTweets(updatedTweet)
  }

  return (
    <TweetContainer>
      <HeaderContainer>
        <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
        <DivDisplayContainer>
          <UserInfoContainer>
            <Span>{nome}</Span>
            <Span $fontColor={colors.light_gray}>@{usuario}</Span>
          </UserInfoContainer>
          <MoreIcon />
        </DivDisplayContainer>
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
        <ListActions
          onClickModal={() => setOpenCommentModalId(tweetId)}
          onClickRetweetModal={() => setOpenRetweetModal(true)}
          onClickLikeListUpdate={handleLikeListUpdate}
          onSuccessAction={() => refreshList()}
          comentarios={userData.comentarios}
          likes={userData.likes}
          isLikedByUser={isLikedByUser}
          isRetweetedWithoutQuoteByUser={isRetweetedWithoutQuoteByUser}
          retweets={userData.retweets}
          isRetweetedByUser={isRetweetedByUser}
          tweetId={tweetId} />
        <Modal showModal={openCommentModalId === tweetId} setShowModal={setOpenCommentModalId}>
          <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
          <BodyTweet userData={userData} />
          <ReplyTweet handleAddComment={handleAddComment} postUser={usuario} tweetId={tweetId} refreshList={refreshList} />
        </Modal>
        <Modal showModal={openRetweetModal} setShowModal={setOpenRetweetModal}>
          <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
          <BodyTweet userData={userData} />
          <ReplyTweet handleAddComment={handleAddComment} postUser={usuario} tweetId={tweetId} refreshList={refreshList} />
        </Modal>
      </Footer>
    </TweetContainer>
  );
}

export default MainTweet;
