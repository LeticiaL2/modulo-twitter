import styled from "styled-components";
import { colors } from "../../../styles/colors";

const basicBtn = styled.button`
  width: 100%;
  border: none;
  cursor: pointer;
  border-radius: 24px;
`;

export const Container = styled(basicBtn)`
    ${props => props.$borderColor ? `border: 1px solid ${props.$borderColor};` : null}
    font-family: 'Twitter', sans-serif;
    font-weight: 700;
    font-size: ${props => props.$fontSize ? props.$fontSize : "1rem"};
    background-color: ${props => props.$bgColor ? props.$bgColor : colors.blue};
    color: ${props => props.$fontColor ? props.$fontColor : colors.white};
    padding: 0.5rem 1rem;

    &:disabled {
      background-color: rgba(29, 155, 240, 0.5);
    }
`;
