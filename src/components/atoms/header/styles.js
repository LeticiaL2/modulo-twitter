import styled from "styled-components";
import { RiTwitterXLine } from "react-icons/ri";

export const HeaderContainer = styled.div`
display: flex;
justify-content: center;
width: 20%;
min-width: 10%;

@media screen and (max-width: 620px){
        width: 30%;
        
    }

    @media screen and (max-width: 475px){
        width: 50%;
    }

`


export const LogoX = styled(RiTwitterXLine)`
  height: 30%;
  width: 100%;
`;