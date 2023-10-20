import React from "react";
import Header from "../../components/atoms/header/header";
import BoxSignup from "../../components/molecules/box-signup/box-signup";
import TitleIntro from "../../components/atoms/title_intro/title_intro";
import {SignUpPage} from "./styles"
import GlobalStyles from "../../styles/global-style";


function SignupPage () {

    return (
        
        <SignUpPage>
            <GlobalStyles/>
            <Header/>
            <TitleIntro text="Crie sua conta!"/>
            <BoxSignup/>
        </SignUpPage>
    );
}

export default SignupPage;