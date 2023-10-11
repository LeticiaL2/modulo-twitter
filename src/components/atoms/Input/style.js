import styled, { css } from "styled-components";

export const Container = styled.input`
  font-size: 1.5rem;
  border: none;
  color: var(--font-color);
  background-color: var(--background-color);
  padding: 0.75rem 0;
  width: 100%;

  ${({variant}) => variant === "outline" && css`
    border: 1px solid var(--border-color);
    border-radius: .7rem;
    padding: .75rem .75rem;
  `}

  &:focus {
    outline: none;
  }
`;
