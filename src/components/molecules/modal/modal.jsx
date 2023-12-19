import React from "react";
import { Container, ContainerModal } from "./styles";

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <Container showModal={showModal}>
          <ContainerModal showModal={showModal}>
            <button onClick={() => setShowModal((prev) => !prev)}>
              fechar
            </button>
          </ContainerModal>
        </Container>
      ) : null}
      ;
    </>
  );
};

export default Modal;
