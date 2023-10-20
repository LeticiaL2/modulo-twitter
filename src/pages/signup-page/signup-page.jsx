import React from "react";
import "./signup-page.css"
import Header from "../../components/atoms/header/header";
import BoxSignup from "../../components/molecules/box-signup/box-signup";
import TitleIntro from "../../components/atoms/title_intro/title_intro";
import {ContainerSignUpPage} from "./styles"


function SignupPage () {

    return (
        <ContainerSignUpPage>
            <Header/>
            <TitleIntro className="text_title" text="Crie sua conta!"/>
            <BoxSignup/>
        </ContainerSignUpPage>
    );
}

export default SignupPage;