import { useRef, React } from "react";
import {
  Container,
  ContainerModal,
  HeaderContainer,
  IconClose,
  Draft,
  BodyContainer,
} from "./styles";
import { IoClose } from "react-icons/io5";

const ModalTemplate = ({ showModal, onClose, children }) => {
  const modalRef = useRef();

  function closeModal(e) {
    if (modalRef.current === e.target) {
      onClose(false);
    }
  }

  return (
    <>
      {showModal ? (
        <Container ref={modalRef} onClick={closeModal}>
          <ContainerModal>
            <HeaderContainer>
              <IconClose onClick={() => onClose()}>
                <IoClose />
              </IconClose>
              <Draft>Draft</Draft>
            </HeaderContainer>
            <BodyContainer>{children}</BodyContainer>
          </ContainerModal>
        </Container>
      ) : null}
    </>
  );
};

export default ModalTemplate;
