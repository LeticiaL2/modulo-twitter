import styled from "styled-components";

export const TweetContainer = styled.article`
  margin-top: 0.75rem;
  padding: 0 1rem;
  display: flex;
  border-bottom: 1px solid var(--border-color);
  width: 100%;
  gap: 0.75rem;
`;

export const Body = styled.div`
  padding-bottom: 0.75rem;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

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
`;

export const GrayContainer = styled.div`
  display: flex;
  color: var(--font-color-light);
`;

export const Content = styled.span`
  word-break: break-word;
  line-height: 20px;
`;

export const Footer = styled.footer`
  display: flex;
  margin-top: 0.75rem;
  font-size: 13px;
  justify-content: space-between;
  color: var(--font-color-light);
`;

export const Action = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  cursor: pointer;
`;
