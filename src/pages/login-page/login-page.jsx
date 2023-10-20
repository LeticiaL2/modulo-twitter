import React from "react";
import BoxLogin from "../../components/molecules/box-login/box-login";
import TitleIntro from "../../components/atoms/title_intro/title_intro";
import Header from "../../components/atoms/header/header";
import {ContainerLoginPage} from "./styles"


function LoginPage () {
    

    return (
        
        <ContainerLoginPage> 
            <Header/>
            <TitleIntro text="Acontecendo agora"/>
            <BoxLogin/>
        </ContainerLoginPage>
    );
}

export default LoginPage;
