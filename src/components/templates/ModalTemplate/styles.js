import styled from "styled-components"
import { colors } from "../../../styles/colors"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: ${colors.transparent_blue};
`

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.5rem 1rem;
  background-color: ${colors.black};
  width: 100%;
  max-width: 600px;
  border-radius: 0.5rem;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

export const CloseContainer = styled.div`
  cursor: pointer;
`

export const BodyContainer = styled.div`
  margin-bottom: 2rem;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

export const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
