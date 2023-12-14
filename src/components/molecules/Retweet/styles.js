import styled from "styled-components"
import { colors } from "../../../styles/colors"

export const Body = styled.div`
  padding-bottom: 0.75rem;
  width: 100%;
`

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
`

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 360px) {
    flex-direction: row;
  }
`

export const FlexContainer = styled.div`
  display: flex;
`

export const ContentContainer = styled.p`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  line-height: 20px;


  span:hover {
    text-decoration: underline;
  }
`