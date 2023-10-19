import styled from "styled-components"
import { colors } from "../../../styles/colors"

export const Field = styled.div`
  position: relative;
`

export const Container = styled.input`
  /* position: relative; */
  font-family: "Twitter", sans-serif;
  font-size: 1.5rem;
  border: none;
  color: ${colors.white};
  background-color: ${colors.black};
  padding: 0.75rem 0.75rem;
  width: 100%;
  border: ${props =>
    props.$border === "outline" ? `1px solid ${colors.light_gray}` : "none"};
  border-radius: 0.7rem;

  &:focus {
    outline: none;
  }
`

export const PasswordIcon = styled.div`
  position: absolute;
  top: 1.3rem;
  right: .7rem;
  cursor: pointer;

  svg {
    height: 19px;
    width: 19px;
  }
`
