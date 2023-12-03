import styled from "styled-components";

export const ContainerReply = styled.div`
  padding: 0;
  margin: 0;
  cursor: pointer;
  width: 100%;
`;

export const Container = styled.div`
  border-top: 1px solid #565656;
  border-bottom: 1px solid #565656;
  width: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
`;
export const TopTweetCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const ContentContainer = styled.div`
  padding: 0;
  margin: 0;
`;

export const NameProfile = styled.h1`
  font-family: "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif, Arial,
    sans-serif;
  font-size: 1.2rem;
  padding: 5px;
  margin: 0;
`;

export const User = styled.p`
  font-family: "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif, Arial,
    sans-serif;
  font-size: 0.8rem;
  color: rgb(113, 118, 123);
  padding: 3px;
`;

export const ContentTweet = styled.p`
  font-family: "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif, Arial,
    sans-serif;
  margin-left: 48px;
  padding: 0;
  font-size: 1rem;
  overflow: hidden;
  word-wrap: break-word;
  color: white;
`;

export const FooterTweetCard = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

export const ShowMore = styled.span`
  background: none;
  border: none;
  color: #00acee;
  cursor: pointer;
  font-size: 1rem;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;
