import styled from "styled-components"
import { colors } from "../../../styles/colors"


export const TweetContainer = styled.article`
  margin-top: 0.75rem;
  padding: 0 1rem;
  display: flex;
  border-bottom: 1px solid ${colors.dark_gray};
  width: 100%;
  gap: 0.75rem;
  cursor: pointer;
`

export const Body = styled.div`
  padding-bottom: 0.75rem;
  width: 100%;
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

export const UserInfo = styled.div`
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

export const GrayContainer = styled.div`
  display: flex;
  color: ${colors.light_gray};
`

export const Content = styled.p`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  line-height: 20px;

  span {
    cursor: pointer;
    color: ${colors.blue};
  }

  span:hover {
    text-decoration: underline;
  }
`

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  font-size: 13px;
  color: ${colors.light_gray};
`
