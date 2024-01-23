import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLocalStorage } from '../../../contexts/util';
import Api from '../../../services/api';
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon';
import UserPhoto from '../../atoms/UserPhoto';
import BodyTweet from '../../molecules/BodyTweet';
import ListActions from '../../organisms/ListActions';
// import Modal from '../../organisms/Modal';
import ReplyTweet from '../../molecules/ReplyTweet';
import Modal from '../../templates/ModalTemplate';
import {
  AditionalInfoContainer,
  BodyContainer,
  MainInfoContainer,
  TweetContainer
} from './styles';
import PostRetweet from '../../molecules/PostRetweet';

function Tweet({
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
  onCloseRetweetModal
}) {

  const navigate = useNavigate()

  const tweet = userData.retweetPai && userData.texto === null ? userData.retweetPai : userData
  const { id: tweetId, usuario, isLikedByUser, isRetweetedByUser, isRetweetedWithoutQuoteByUser, comentarios, likes, retweets } = tweet

  const handleTweetClick = () => {
    if (isOpenCommentModal || isOpenRetweetModal) return
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
              onClickModal={() => onOpenCommentModal()}
              onClickRetweetModal={() => onOpenRetweetModal()}
              onSuccessAction={() => refreshList()}
              onClickLikeListUpdate={handleLikeListUpdate}
              comentarios={comentarios}
              likes={likes}
              isLikedByUser={isLikedByUser}
              isRetweetedWithoutQuoteByUser={isRetweetedWithoutQuoteByUser}
              retweets={retweets}
              isRetweetedByUser={isRetweetedByUser}
              tweetId={tweetId} />
            <Modal showModal={isOpenCommentModal} onClose={onCloseCommentModal}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
                <BodyTweet userData={tweet} />
              </div>
              <ReplyTweet handleAddComment={handleAddComment} postUser={usuario} tweetId={tweetId}/>
            </Modal>
            <Modal showModal={isOpenRetweetModal} onClose={onCloseRetweetModal}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
                <BodyTweet userData={tweet} />
              </div>
              <PostRetweet onPostRetweet={handleAddRetweetWithQuote} tweetId={tweetId}/>
            </Modal>
          </BodyContainer>
        </MainInfoContainer>
      </TweetContainer>
    </>
  );
}

export default Tweet;
