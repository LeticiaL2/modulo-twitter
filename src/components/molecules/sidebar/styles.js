import styled from "styled-components";

export const Container = styled.div`
  width: 15%;
  padding: 0;
  display: flex;
  flex-direction: column;

  height: 100%;
  @media screen and (max-width: 1024px) {
    width: 6em;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const ContainerSidebar = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const SidebarItem = styled.div`
  padding: 0;
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`;
