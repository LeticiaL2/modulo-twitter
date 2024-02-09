import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(228, 242, 247, 0.1);
  margin: 0;
  padding: 0;
`;

export const SidebarItem = styled.div`
  display: flex;
  padding: 5px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameProfile = styled.span`
  color: white;
  padding: 0;
  font-size: 1.2rem;
  padding: 0;
  padding-bottom: 3px;
  padding-top: 3px;
  font-weight: bold;
`;

export const UserName = styled.span`
  color: rgb(113, 118, 123);
  font-size: 0.8rem;

  padding: 0;
`;

export const ContainerSidebarMobile = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: black;
  height: 100%;
  width: 60%;
  padding: 0;
  margin: 0;
`;
