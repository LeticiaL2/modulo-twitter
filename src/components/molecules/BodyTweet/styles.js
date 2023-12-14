import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
`

export const BodyContainer = styled.div`
  padding-bottom: 0.75rem;
  width: 100%;
`

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  line-height: 20px;

  span:hover {
    text-decoration: underline;
  }
`

export const RetweetContainer = styled.div`
  border: 1px solid rgba(113, 118, 123, 0.5);
  border-radius: 0.75rem;
  padding: 0.5rem;
  margin-top: 0.5rem;

  &:hover {
    background-color: rgba(113, 118, 123, 0.18);
  }
`
