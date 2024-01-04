import React, { useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getUserLocalStorage } from '../../../contexts/util'
import Api from '../../../services/api'
import CloseIcon from '../../atoms/SVGIcons/CloseIcon'
import ReplyTweet from '../ReplyTweet'
import { BodyContainer, CloseContainer, Container, ContentContainer, DraftContainer, FooterContainer, HeaderContainer, ModalContainer } from './styles'
import { TweetContext } from '../../organisms/Main'

const modalElement = document.getElementById('portal')

function Modal({ showModal, setShowModal, children, userData, isComment }) {
  const { refreshTweet } = useContext(TweetContext)
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
    } catch (error) {
      console.log(error)
    }
  }

  async function handleReplyTweetWithQuote(replyData) {
    try {
      const response = await Api.post(`api/v1/tweets/${userData.id}/retweets`, replyData, { headers: { Authorization: `Bearer ${getUserLocalStorage().token}` } })
      refreshTweet()
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