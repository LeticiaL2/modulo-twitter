import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLocalStorage } from '../../../contexts/util';
import Api from '../../../services/api';
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon';
import UserPhoto from '../../atoms/UserPhoto';
import BodyTweet from '../../molecules/BodyTweet';
import ListActions from '../../organisms/ListActions';
// import Modal from '../../organisms/Modal';
import Modal from '../../templates/ModalTemplate';
import {
  AditionalInfoContainer,
  BodyContainer,
  MainInfoContainer,
  TweetContainer
} from './styles';
import ReplyTweet from '../../molecules/ReplyTweet';

function Tweet({ userData, refreshList, updateTweets, handleAddComment }) {
  const [openCommentModal, setOpenCommentModal] = useState(false)
  const [openRetweetModal, setOpenRetweetModal] = useState(false)
  const navigate = useNavigate()

  const tweet = userData.retweetPai && userData.texto === null ? userData.retweetPai : userData
  const { id: tweetId, usuario, isLikedByUser, isRetweetedByUser, isRetweetedWithoutQuoteByUser, comentarios, likes, retweets } = tweet

  const handleTweetClick = () => {
    if (openCommentModal || openRetweetModal) return
    navigate(`/tweet/${tweetId}`)
  }

  const handleRemoveTweet = async () => {
    try {
      const response = await Api.delete(`api/v1/tweets/${userData.id}`, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      if (refreshList && response.data.mensagem.codigo === 200) {
        refreshList()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLikeListUpdate = (isLikedByUser, likes) => {
    const updatedTweet = {
      ...tweet,
      isLikedByUser: !isLikedByUser,
      likes: isLikedByUser ? likes - 1 : likes + 1
    }
    updateTweets(updatedTweet)
  }

  return (
    <>
      <TweetContainer onClick={handleTweetClick}>
        {userData.retweetPai && !userData.texto && <AditionalInfoContainer>
          <div className='icon'><RetweetIcon /></div>
          <div className='retweet'>{userData.usuario === getUserLocalStorage().usuario ? 'You' : `${userData.usuario}`} Reposted</div>
        </AditionalInfoContainer>}
        <MainInfoContainer>
          <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
          <BodyContainer>
            <BodyTweet userData={tweet} username={userData.usuario} onClickRemoveTweet={handleRemoveTweet} />
            <ListActions
              onClickModal={() => setOpenCommentModal(true)}
              onClickRetweetModal={() => setOpenRetweetModal(true)}
              onSuccessAction={() => refreshList()}
              onClickLikeListUpdate={handleLikeListUpdate}
              comentarios={comentarios}
              likes={likes}
              isLikedByUser={isLikedByUser}
              isRetweetedWithoutQuoteByUser={isRetweetedWithoutQuoteByUser}
              retweets={retweets}
              isRetweetedByUser={isRetweetedByUser}
              tweetId={tweetId} />
            <Modal showModal={openCommentModal} setShowModal={setOpenCommentModal}>
              <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
              <BodyTweet userData={tweet} />
              <ReplyTweet handleAddComment={handleAddComment} postUser={usuario} tweetId={tweetId} refreshList={refreshList} />
            </Modal>
            <Modal showModal={openRetweetModal} setShowModal={setOpenRetweetModal}>
              <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
              <BodyTweet userData={tweet} />
              <ReplyTweet handleAddComment={handleAddComment} postUser={usuario} tweetId={tweetId} refreshList={refreshList} />
            </Modal>
          </BodyContainer>
        </MainInfoContainer>
      </TweetContainer>
    </>
  );
}

export default Tweet;
