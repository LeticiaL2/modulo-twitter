import styled from "styled-components"
import { colors } from "../../../styles/colors"

export const Container = styled.span`
  color: ${props => (props.$fontColor ? props.$fontColor : colors.white)};
`
