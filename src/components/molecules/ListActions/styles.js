import styled from "styled-components"
import { colors } from "../../../styles/colors"

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  font-size: 13px;
  color: ${colors.light_gray};
`

export const ActionContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  cursor: pointer;
  position: relative;

  > span {
    color: ${props => props.$actionColor};
    transition: color 0.2s ease-in-out;
  }
  > svg {
    fill: ${props => props.$actionColor};
    stroke: ${props => props.$actionColor};
    transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
  }

  &:hover {
    > span {
      color: ${props =>
        props.$hoverColor ? props.$hoverColor : colors.blue};
    }

    > svg {
      fill: ${props =>
        props.$hoverColor ? props.$hoverColor : colors.blue};
      stroke: ${props =>
        props.$hoverColor ? props.$hoverColor : colors.blue};
    }
  }
`
