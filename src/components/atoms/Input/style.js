import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const Container = styled.input`
  font-family: 'Twitter', sans-serif;
  font-size: 1.5rem;
  border: none;
  color: ${colors.white};
  background-color: ${colors.black};
  padding: .75rem .75rem;
  width: 100%;
  border: ${props => props.border === 'outline' ? `1px solid ${colors.light_gray}` : "none"};
  border-radius: .7rem;


  &:focus {
    outline: none;
  }
`;
