import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  margin: 0;
  background-color: transparent;
  font-family: "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif, Arial,
    sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const BoxCenter = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 30%;
  border-right: 1px solid #565656;
  border-left: 1px solid #565656;
  @media screen and (max-width: 1440px) {
    width: 40%;
  }

  @media screen and (max-width: 930px) {
    width: 50%;
  }

  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
