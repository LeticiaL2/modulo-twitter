import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLocalStorage } from '../../../contexts/util';
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon';
import UserPhoto from '../../atoms/UserPhoto';
import BodyTweet from '../BodyTweet';
import ListActions from '../ListActions';
import Modal from '../Modal';
import {
  AditionalInfoContainer,
  BodyContainer,
  MainInfoContainer,
  TweetContainer
} from './styles';
import Api from '../../../services/api';

function Tweet({ userData }) {
  const [openCommentModal, setOpenCommentModal] = useState(false)
  const [openRetweetModal, setOpenRetweetModal] = useState(false)
  const navigate = useNavigate()

  const tweet = userData.retweetPai && userData.texto === null ? userData.retweetPai : userData
  const { id: tweetId, usuario, isLikedByUser, isRetweetedByUser, comentarios, likes, retweets } = tweet

  const handleTweetClick = () => {
    if (openCommentModal || openRetweetModal) return
    navigate(`/tweet/${tweetId}`)
  }
  const handleDropdownRetweet = async (e) => {

  }

  const handleRetweetWithoutQuote = async () => {
    try {
      const response = await Api.post(`api/v1/tweets/${tweetId}/retweets`, {}, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <TweetContainer onClick={handleTweetClick}>
        {userData.retweetPai && !userData.texto && <AditionalInfoContainer>
          <div className='icon'><RetweetIcon /></div>
          <div className='retweet'>{usuario === getUserLocalStorage().usuario ? 'You' : `${usuario}`} Reposted</div>
        </AditionalInfoContainer>}
        <MainInfoContainer>
          <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
          <BodyContainer>
            <BodyTweet userData={tweet} />
            <ListActions onClickModal={() => setOpenCommentModal(true)} onClickRetweetModal={() => setOpenRetweetModal(true)} onClickWithoutQuote={handleRetweetWithoutQuote} comentarios={comentarios} likes={likes} isLikedByUser={isLikedByUser} retweets={retweets} isRetweetedByUser={isRetweetedByUser} tweetId={tweetId} />
            <Modal userData={tweet} showModal={openCommentModal} setShowModal={setOpenCommentModal} isComment={true}>
              <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
              <BodyTweet userData={tweet} />
            </Modal>
            <Modal userData={tweet} showModal={openRetweetModal} setShowModal={setOpenRetweetModal} isComment={false}>
              <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />

            </Modal>
          </BodyContainer>
        </MainInfoContainer>
      </TweetContainer>
    </>
  );
}

export default Tweet;
