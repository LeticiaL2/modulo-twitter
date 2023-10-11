import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";

const basicBtn = styled.button`
  width: 100%;
  border: none;
  cursor: pointer;
  border-radius: 24px;
`;

export const Container = styled(basicBtn)`
  ${({ variant }) =>
    variant === "primary" &&
    css`
      background-color: ${colors.blue};
      color: var(--font-color);
      font-weight: var(--fw-bold);
      padding: 0.5rem 1rem;

      &:disabled {
        background-color: rgba(29, 155, 240, 0.5);
      }
    `}

  ${({ variant }) => variant === "login" && css`
      background-color: white;
      color: black;
      font-weight: var(--fw-bold);
      font-size: 1.2rem;
      padding: 0.2rem 1rem;
  `}
`;
