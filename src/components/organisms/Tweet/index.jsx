import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLocalStorage } from '../../../contexts/util';
import Api from '../../../services/api';
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon';
import UserPhoto from '../../atoms/UserPhoto';
import BodyTweet from '../../molecules/BodyTweet';
import ListActions from '../../molecules/ListActions';
import Modal from '../../organisms/Modal';
import {
  AditionalInfoContainer,
  BodyContainer,
  MainInfoContainer,
  TweetContainer
} from './styles';

function Tweet({ userData, refreshList, updateTweets }) {
  const [openCommentModal, setOpenCommentModal] = useState(false)
  const [openRetweetModal, setOpenRetweetModal] = useState(false)
  const navigate = useNavigate()

  const tweet = userData.retweetPai && userData.texto === null ? userData.retweetPai : userData
  const { id: tweetId, isLikedByUser, isRetweetedByUser, isRetweetedWithoutQuoteByUser, comentarios, likes, retweets } = tweet
  const isRetweet = userData.retweetPai && userData.texto === null ? true : false

  const handleTweetClick = () => {
    if (openCommentModal || openRetweetModal) return
    navigate(`/tweet/${tweetId}`)
  }

  const handleRetweetWithoutQuote = async () => {
    try {
      const response = await Api.post(`api/v1/tweets/${tweetId}/retweets`, {}, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      refreshList()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUndoRetweet = async (id) => {
    try {
      const response = await Api.delete(`api/v1/tweets/${id}`, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      refreshList()
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveTweet = async () => {
    try {
      const response = await Api.delete(`api/v1/tweets/${userData.id}`, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      refreshList()
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
              onClickWithoutQuote={handleRetweetWithoutQuote}
              onClickUndoRetweet={handleUndoRetweet}
              onClickLikeListUpdate={handleLikeListUpdate}
              comentarios={comentarios}
              likes={likes}
              isLikedByUser={isLikedByUser}
              isRetweetedWithoutQuoteByUser={isRetweetedWithoutQuoteByUser}
              retweets={retweets}
              isRetweetedByUser={isRetweetedByUser}
              tweetId={tweetId} />
            <Modal userData={tweet} showModal={openCommentModal} setShowModal={setOpenCommentModal} isComment={true} refreshList={refreshList} updateTweets={updateTweets}>
              <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
              <BodyTweet userData={tweet} />
            </Modal>
            <Modal userData={tweet} showModal={openRetweetModal} setShowModal={setOpenRetweetModal} isComment={false} refreshList={refreshList} updateTweets={updateTweets}>
              <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
              <BodyTweet userData={tweet} />
            </Modal>
          </BodyContainer>
        </MainInfoContainer>
      </TweetContainer>
    </>
  );
}

export default Tweet;
