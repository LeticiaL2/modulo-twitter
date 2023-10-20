import styled from "styled-components";
import {Link} from "react-router-dom"



export const Container = styled.div`

display: flex;
justify-content: center;
align-items: center;
width: 100%;


`

export const ContainerLogin = styled.div`
display: flex;
flex-direction: column;
width: 50%;
justify-content: center;
align-items: center;
@media screen and (max-width: 998px){
        width: 80%;
    }
    @media screen and (max-width: 760px){
        width: 90%;
    }

    @media screen and (max-width: 630px){
        width: 100%;
    }
   
`

export const FormContainer = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 998px){
        width: 70%;
    }
    @media screen and (max-width: 760px){
        width: 80%;
    }

    @media screen and (max-width: 630px){
        width: 100%;
    }

`

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: flex-start;
    align-items: center;
`

export const LinkButton = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-decoration: none;
    line-height: 0;
`