import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkContainerTweet = styled(Link)`
  padding: 0;
  color: inherit;
  text-decoration: none;
  width: 100%;
  margin: 0;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px;
  margin-top: 5%;
  padding: 0px;
`;

export const ContainerTweetCard = styled.div`
  border: 2px solid #565656;
  border-radius: 15px;
  padding-bottom: 0;
  padding-right: 0;
  padding-left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TopTweetCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 92%;
  margin-left: 2%;
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
  margin-left: 5%;
  padding-bottom: 6%;
  font-size: 1rem;
  overflow: hidden;
  word-wrap: break-word;
`;

export const FooterTweetCard = styled.div`
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

export const Reposted = styled.span`
  font-size: 0.8rem;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 12%;
  color: #565656;
`;
