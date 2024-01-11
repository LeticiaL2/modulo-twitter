import React, { useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import { TweetsListContext } from '../../../contexts/tweetsTimeline'
import { getUserLocalStorage } from '../../../contexts/util'
import Api from '../../../services/api'
import CloseIcon from '../../atoms/SVGIcons/CloseIcon'
import ReplyTweet from '../../molecules/ReplyTweet'
import { BodyContainer, CloseContainer, Container, ContentContainer, DraftContainer, FooterContainer, HeaderContainer, ModalContainer } from './styles'

const modalElement = document.getElementById('portal')

function Modal({ showModal, setShowModal, children, userData, isComment, isRetweet }) {
  const { refreshTweets, updateTweets } = useContext(TweetsListContext)
  const modalRef = useRef()

  function closeModal(e) {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }

  async function handleCommentTweet(replyData) {
    try {
      const response = await Api.post(`api/v1/tweets/${userData.id}/comentarios`, replyData, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      setShowModal(false)
      const updatedTweet = {
        ...userData,
        comentarios: userData.comentarios + 1
      }
      updateTweets(updatedTweet, isRetweet)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleReplyTweetWithQuote(replyData) {
    try {
      const response = await Api.post(`api/v1/tweets/${userData.id}/retweets`, replyData, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      refreshTweets()
      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }


  if (showModal) {
    if (isComment) {
      return createPortal(
        <Container ref={modalRef} onClick={closeModal}>
          <ModalContainer>
            <HeaderContainer>
              <CloseContainer onClick={() => setShowModal(prev => !prev)}>
                <CloseIcon />
              </CloseContainer>
              <DraftContainer>Draft</DraftContainer>
            </HeaderContainer>
            <BodyContainer>
              <ContentContainer >
                {children}
              </ContentContainer>
              <ReplyTweet onReplyTweet={handleCommentTweet} postUser={userData.usuario} />
            </BodyContainer>
            <FooterContainer >
              {/* <Button>Reply</Button> */}
            </FooterContainer>
          </ModalContainer>
        </Container>,
        modalElement
      )
    }

    return createPortal
      (<Container ref={modalRef} onClick={closeModal}>
        <ModalContainer>
          <HeaderContainer >
            <CloseContainer onClick={() => setShowModal(prev => !prev)}>
              <CloseIcon />
            </CloseContainer>
            <DraftContainer>Draft</DraftContainer>
          </HeaderContainer>
          <BodyContainer >
            <ContentContainer >
              {children}
            </ContentContainer>
            <ReplyTweet onReplyTweet={handleReplyTweetWithQuote} postUser={userData.usuario} />
          </BodyContainer>
          <FooterContainer >
            {/* <Button>Reply</Button> */}
          </FooterContainer>
        </ModalContainer>
      </Container>,
        modalElement)
  }

  return null
}

export default Modal