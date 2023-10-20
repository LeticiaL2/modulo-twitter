import styled from "styled-components";


export const ContainerTweetCard = styled.div`
   
   border: 1px solid #565656;
   padding: 0;
   margin: 0;

`

export const TopTweetCard = styled.div`

display: flex;
align-items: center;
padding: 10px;
/*flex-wrap: wrap;*/

`

export const ContentContainer = styled.div`


`


export const NameProfile = styled.h1`
  font-family:  'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif, Arial, sans-serif;
  font-size: 1.2rem;
  padding: 5px;
  margin: 0;
`

export const User = styled.p`

  font-family:  'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif, Arial, sans-serif;
  font-size: 0.8rem;
  color: rgb(113, 118, 123);
  padding: 3px;
`

export const ContentTweet = styled.p`
    font-family: 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif, Arial, sans-serif;
  margin-left: 48px;
  padding: 0;
  font-size: 1rem;
  overflow: hidden; 
  word-wrap: break-word;
`

export const FooterTweetCard = styled.div`
 display: flex;
 justify-content: space-around;

`

export const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #00acee;
  cursor: pointer;
  font-size: 1rem;
`;
