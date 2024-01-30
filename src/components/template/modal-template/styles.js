import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(228, 242, 247, 0.1);
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px;
  padding: 0px;
`;

export const IconClose = styled.button`
  border-style: none;
  color: white;
  font-size: 1.4em;
  cursor: pointer;
`;

export const Draft = styled.div`
  color: #00acee;
`;

export const ContainerModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.5rem 1rem;
  background-color: black;
  width: 90%;
  max-width: 600px;
`;
