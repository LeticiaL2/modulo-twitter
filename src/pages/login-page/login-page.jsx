import React from "react";
import BoxLogin from "../../components/organism/box-login/box-login";
import TitleIntro from "../../components/atoms/title_intro/title_intro";
import Header from "../../components/atoms/header/header";
import {ContainerLoginPage} from "./styles"
import GlobalStyles from "../../styles/global-style";


function LoginPage () {
    

    return (
        
        <ContainerLoginPage> 
            <GlobalStyles/>
                <Header/>
                <TitleIntro text="Acontecendo agora"/>
                <BoxLogin/>
            
        </ContainerLoginPage>
    );
}

export default LoginPage;
