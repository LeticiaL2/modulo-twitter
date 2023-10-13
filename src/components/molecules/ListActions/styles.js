import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const Action = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.actionColor ? props.actionColor : colors.light_gray};
    svg {
      fill: ${props => props.actionColor ? props.actionColor : colors.light_gray};
    }

    span {
      /* color: ${props => props.actionColor ? props.actionColor : colors.light_gray}; */
    }
  }
`
