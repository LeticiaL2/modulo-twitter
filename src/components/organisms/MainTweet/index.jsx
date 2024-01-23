import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../styles/colors';
import DotIcon from '../../atoms/SVGIcons/DotIcon';
import MoreIcon from '../../atoms/SVGIcons/MoreIcon';
import Span from '../../atoms/Span';
import UserPhoto from '../../atoms/UserPhoto';
import BodyTweet from '../../molecules/BodyTweet';
import PostRetweet from '../../molecules/PostRetweet';
import ReplyTweet from '../../molecules/ReplyTweet';
import ListActions from '../../organisms/ListActions';
import Modal from '../../templates/ModalTemplate';
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

function MainTweet({
  userData,
  refreshList,
  updateTweets,
  handleAddComment,
  handleAddRetweetWithQuote,
  isOpenCommentModal,
  onOpenCommentModal,
  onCloseCommentModal,
  isOpenRetweetModal,
  onOpenRetweetModal,
  onCloseRetweetModal,
}) {
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
          onClickModal={() => onOpenCommentModal()}
          onClickRetweetModal={() => onOpenRetweetModal()}
          onClickLikeListUpdate={handleLikeListUpdate}
          onSuccessAction={() => refreshList()}
          comentarios={userData.comentarios}
          likes={userData.likes}
          isLikedByUser={isLikedByUser}
          isRetweetedWithoutQuoteByUser={isRetweetedWithoutQuoteByUser}
          retweets={userData.retweets}
          isRetweetedByUser={isRetweetedByUser}
          tweetId={tweetId} />
        <Modal showModal={isOpenCommentModal} onClose={onCloseCommentModal}>
          <div style={{ display: 'flex', gap: '1rem'}}>
            <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
            <BodyTweet userData={userData} />
          </div>
          <ReplyTweet handleAddComment={handleAddComment} postUser={usuario} tweetId={tweetId}/>
        </Modal>
        <Modal showModal={isOpenRetweetModal} onClose={onCloseRetweetModal}>
          <div style={{ display: 'flex', gap: '1rem'}}>
            <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
            <BodyTweet userData={userData} />
          </div>
          <PostRetweet onPostRetweet={handleAddRetweetWithQuote} tweetId={tweetId}/>
        </Modal>
      </Footer>
    </TweetContainer>
  );
}

export default MainTweet;
