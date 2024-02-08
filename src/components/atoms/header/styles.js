import styled from "styled-components";
import { RiTwitterXLine } from "react-icons/ri";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 10rem;
  min-width: 10%;
`;

export const LogoX = styled(RiTwitterXLine)`
  height: 30%;
  width: 100%;

  @media screen and (max-width: 425px) {
    width: 70%;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  right: 2vw;
  top: 2vh;

  @media screen and (max-width: 425px) {
    display: flex;
    justify-content: center;
    position: absolute;
    background-color: transparent;
    position: absolute;
    left: 50%;
    top: 20;
    transform: translate(-50%, -50%);

    width: 50%;
  }
`;
