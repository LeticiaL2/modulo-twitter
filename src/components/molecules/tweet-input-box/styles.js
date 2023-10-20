import styled from "styled-components";


export const TweetBoxInput = styled.div`
    padding: 15px;
    border: 1px solid #565656;
    display: flex;
    flex-direction: column;
    color: white;
    align-items: flex-end;
`



export const UserContainer = styled.div`
    display: flex;
    padding: 0px;
    border-radius: 10px;
    width: 100%;
    margin: 0;
    align-items: center;
`

export const FooterContainerInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  padding: 0px; 
  width: 40%;


  @media screen and (max-width: 950px){
      width: 45%;
        
    }

    @media screen and (max-width: 600px){
        width: 50%;
       
    }

    @media screen and (max-width: 500px){
        width: 55%;
       
    }
`

export const FormContainer = styled.form`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;


@media screen and (max-width: 500px){
        display: flex;
        justify-content: flex-start;
    }

`

export const TextInput = styled.textarea`
  width: 100%;
  font-size: 1rem;
  border: none;
  resize: none;
  overflow-y: hidden;
  padding: 10px;
  outline: none;
  background-color: transparent;
  color: white;
  margin-top: 5px;

  &::placeholder {
    color: #ccc;
  }

`


export const CharCount = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  color: rgb(113, 118, 123);
  font-size: 0.8rem;
  width: 100%;
  padding:0;
`;
  

