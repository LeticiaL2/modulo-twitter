import styled from "styled-components";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";


export const ContainerInput = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;


    @media screen and (max-width: 620px){
        width: 80%;
        
    }

    @media screen and (max-width: 475px){
        width: 80%;
    }

`

export const InputStyle = styled.input`
    
    border-radius: 20px;
    width: 100%;  
    line-height: 1.5;
   

    background-color: ${(prop) => prop.$backgroundColor ? prop.$backgroundColor : 'white'}; 
    color: ${(prop) => prop.$color ? prop.$color : "black"};
    font-size: ${(prop) => prop.$fontSize ? prop.$fontSize : "1em"};
    border: ${(prop) => prop.$border ? prop.$border : "2px solid #808080"};
  
    

    &::placeholder {
        font-weight: bold;
        opacity: 1;
        color: #808080;
    }

    &:focus {
    outline: none;
  }

  

`

export const EyeIcon = styled(AiFillEye)`
  position: absolute;
  top: 50%;
  color: black;
  background-color: transparent;
  right: 25%; 
  transform: translateY(-50%);
  cursor: pointer;
  width: 3%; 
  height: 35%;
  min-width: 15px;
  min-height: 15px;


  @media screen and (max-width: 2560px){
      left: 88%;
    }

  @media screen and (max-width: 1444px){
      left: 83%;
    }

  @media screen and (max-width: 621px){
      left: 82%;
    }

    @media screen and (max-width: 475px){
      left: 80%;
    }

    @media screen and (max-width: 390px){
      left: 78%;
    }

    @media screen and (max-width: 320px){
      left: 75%;
    }

`;

export const InvisibleEyeIcon = styled(AiFillEyeInvisible)`
  position: absolute;
  top: 50%;
  color: black;
  background-color: transparent;
  right: 25%; 
  transform: translateY(-50%);
  cursor: pointer;
  width: 3%; 
  height: 35%;
  min-width: 15px;
  min-height: 15px;

  @media screen and (max-width: 2560px){
      left: 88%;
    }

  @media screen and (max-width: 1444px){
      left: 83%;
    }

  @media screen and (max-width: 621px){
      left: 82%;
    }

    @media screen and (max-width: 475px){
      left: 80%;
    }

    @media screen and (max-width: 390px){
      left: 78%;
    }

    @media screen and (max-width: 320px){
      left: 75%;
    }

`;