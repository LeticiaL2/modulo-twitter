import styled from "styled-components";

export const Container = styled.img`
  width: ${props => props.$width || "40px"};
  height: ${props => props.$height || "40px"};
  border-radius: 50%;
`