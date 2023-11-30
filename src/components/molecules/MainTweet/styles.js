import styled from "styled-components"
import { colors } from "../../../styles/colors"

export const TweetContainer = styled.article`
  margin-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.dark_gray};
  width: 90%;
`

export const Header = styled.header`
  display: flex;
  gap: 0.75rem;
`

export const DivDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const GrayContainer = styled.div`
  display: flex;
  color: ${colors.light_gray};
`

export const Content = styled.p`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  line-height: 20px;
  margin-top: 0.75rem;
`

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
  font-size: 13px;
  color: ${colors.light_gray};

`
export const DateContainer = styled.div`
  display: flex;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.dark_gray};
`