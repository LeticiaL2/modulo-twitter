import styled from "styled-components";
import { RiTwitterXLine } from "react-icons/ri";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: 1px solid #565656;

  @media screen and (max-width: 375px) {
    justify-content: center;
  }
`;

export const ContainerPhoto = styled.div`
  display: flex;
  padding: 0;

  @media screen and (max-width: 375px) {
    display: none;
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  padding: 0;
  width: 4rem;
  @media screen and (max-width: 375px) {
    display: none;
  }
`;

export const ContainerLogout = styled.div`
  display: flex;
  width: 5rem;
  padding: 0;
  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

export const LogoX = styled(RiTwitterXLine)`
  height: 30%;
  width: 100%;
`;

export const ContainerButtonProfile = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  pointer-events: none;
  border: none;
  @media screen and (max-width: 500px) {
    pointer-events: auto;
  }
`;
