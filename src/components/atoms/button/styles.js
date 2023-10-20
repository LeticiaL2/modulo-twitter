import styled from "styled-components";


export const ButtonStyled = styled.button`
border-radius: 20px;
font-weight: bold;
padding: 7px;
background-color: ${(prop) => prop.$backgroundColor ? prop.$backgroundColor : '#00acee'}; 
color: ${(prop) => prop.$color ? prop.$color : "white"};
font-size: ${(prop) => prop.$fontSize ? prop.$fontSize : "1em"};
border: ${(prop) => prop.$border ? prop.$border : "none"};
width: 100%;
`

export const ContainerButton = styled.div `
    display: flex;
    justify-content: right;
    width: ${(prop) => prop.$width ? prop.$width : "100%"};
  
    
    @media screen and (max-width: 620px){
      width: 20rem;
        
    }

    @media screen and (max-width: 475px){
        width: 20rem;
       
    }



   
`