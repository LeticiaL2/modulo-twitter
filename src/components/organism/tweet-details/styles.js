import styled from "styled-components";

export const TweetDetailsContainer = styled.div`
  padding: 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;

export const TopTweet = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  padding-bottom: 0;
  justify-content: space-between;
`;

export const TopTweetLeft = styled.div`
  width: 160px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const TopTweetRight = styled.div`
  display: flex;
  @media screen and (max-width: 1440px) {
    width: 40%;
  }

  @media screen and (max-width: 930px) {
    width: 50%;
  }

  @media screen and (max-width: 376px) {
    width: 50%;
  }

  @media screen and (max-width: 375px) {
    display: none;
  }
`;

export const ContentContainer = styled.div`
  padding: 0;
  margin: 0;
`;

export const NameProfile = styled.div`
  font-family: "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif, Arial,
    sans-serif;
  font-size: 1.2rem;
  padding: 0x;
  margin-left: 5px;
  font-weight: bold;
`;

export const User = styled.div`
  font-family: "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif, Arial,
    sans-serif;
  font-size: 0.8rem;
  color: rgb(113, 118, 123);
  padding: 0px;
  margin-left: 10%;
`;

export const ContentTweet = styled.p`
  font-family: "Segoe UI", "Open Sans", "Helvetica Neue", sans-serif, Arial,
    sans-serif;
  margin-left: 10px;
  padding: 5px;
  font-size: 1rem;
  overflow: hidden;
  word-wrap: break-word;
  margin-top: 0;
`;
export const TweetDate = styled.p`
  color: rgb(113, 118, 123);
  font-size: 1rem;
  margin-left: 15px;
`;

export const FooterTweetCard = styled.div`
  border-top: 1px solid rgb(113, 118, 123);
  border-bottom: 1px solid rgb(113, 118, 123);
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

export const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #00acee;
  cursor: pointer;
  font-size: 1rem;
`;
