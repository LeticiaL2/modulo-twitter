import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import CloseIcon from '../../atoms/SVGIcons/CloseIcon'
import { BodyContainer, CloseContainer, Container, ContentContainer, FooterContainer, HeaderContainer, ModalContainer } from './styles'

const modalElement = document.getElementById('portal')

function Modal({ showModal, onClose, children }) {
  const modalRef = useRef()

  function closeModal(e) {
    if (modalRef.current === e.target) {
      onClose(false)
    }
  }

  if (showModal) {
    return createPortal
      (<Container ref={modalRef} onClick={closeModal}>
        <ModalContainer >
          <HeaderContainer >
            <CloseContainer onClick={() => onClose()}>
              <CloseIcon />
            </CloseContainer>
          </HeaderContainer>
          <BodyContainer >
            <ContentContainer >
              {children}
            </ContentContainer>
          </BodyContainer>
          <FooterContainer >
          </FooterContainer>
        </ModalContainer>
      </Container>,
        modalElement)
  }

  return null
}

export default Modal