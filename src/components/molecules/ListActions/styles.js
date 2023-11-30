import styled from "styled-components"
import { colors } from "../../../styles/colors"

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const Action = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  cursor: pointer;

  span {
    color: ${props => props.$actionColor};
    transition: color 0.2s ease-in-out;
  }
  svg {
    fill: ${props => props.$actionColor};
    stroke: ${props => props.$actionColor};
    transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
  }

  &:hover {
    span {
      color: ${props =>
        props.$hoverColor ? props.$hoverColor : colors.blue};
    }

    svg {
      fill: ${props =>
        props.$hoverColor ? props.$hoverColor : colors.blue};
      stroke: ${props =>
        props.$hoverColor ? props.$hoverColor : colors.blue};
    }
  }
`
