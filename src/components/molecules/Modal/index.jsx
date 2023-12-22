import React, { useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getUserLocalStorage } from '../../../contexts/util'
import Api from '../../../services/api'
import CloseIcon from '../../atoms/SVGIcons/CloseIcon'
import ReplyTweet from '../ReplyTweet'
import { Container, ModalContainer } from './styles'
import { TweetContext } from '../../organisms/Main'

const modalElement = document.getElementById('portal')

function Modal({ showModal, setShowModal, children, userData, isComment }) {
  const {refreshTweet} = useContext(TweetContext)
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div onClick={() => setShowModal(prev => !prev)}>
                <CloseIcon />
              </div>
              <div>Draft</div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                {children}
              </div>
              <ReplyTweet onReplyTweet={handleCommentTweet} postUser={userData.usuario} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {/* <Button>Reply</Button> */}
            </div>
          </ModalContainer>
        </Container>,
        modalElement
      )
    }

    return createPortal
      (<Container ref={modalRef} onClick={closeModal}>
        <ModalContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div onClick={() => setShowModal(prev => !prev)}>
              <CloseIcon />
            </div>
            <div>Draft</div>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              {children}
            </div>
            <ReplyTweet onReplyTweet={handleReplyTweetWithQuote} postUser={userData.usuario} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Button>Reply</Button> */}
          </div>
        </ModalContainer>
      </Container>,
        modalElement)
  }

  return null
}

export default Modal