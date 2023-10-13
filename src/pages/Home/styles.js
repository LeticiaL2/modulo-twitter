import styled from "styled-components"
import { colors } from "../../styles/colors"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 600px) {
    border-right: 1px solid ${colors.dark_gray};
    border-left: 1px solid ${colors.dark_gray};
  }
`
