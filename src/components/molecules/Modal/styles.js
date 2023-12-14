import styled from "styled-components";
import { colors } from "../../../styles/colors";

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
padding: .5rem 1rem;
background-color: ${colors.black};
width: 90%;
max-width: 600px;
`