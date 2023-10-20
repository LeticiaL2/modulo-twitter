import styled from "styled-components";


export const ContainerTitle = styled.div`
width: 50%;
display: flex;
justify-content: center;
align-items: center;


`

export const Title = styled.h1`
display: flex;
justify-content: center;
align-items: center;
font-size: 3em;





    @media screen and (max-width: 998px){
        width: 100%;
        font-size: 2em; 
    }

    @media screen and (max-width: 804px){
        width: 100%;
        font-size: 1.5em; 
    }

    @media screen and (max-width: 566px){
       display: none;
    }

`