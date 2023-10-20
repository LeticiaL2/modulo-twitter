import styled from "styled-components";



export const Container = styled.div `
    padding: 0;
    margin: 0;
    background-color: black;
    font-family: 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif, Arial, sans-serif;
    width: 100%;
    display: flex;
    justify-content: center;
`


export const BoxCenter = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;

    @media screen and (max-width: 1440px){
        width: 40%;
    }

    @media screen and (max-width: 930px){
        width: 50%;
    }

    @media screen and (max-width: 760px){
        width: 100%;
    }
`