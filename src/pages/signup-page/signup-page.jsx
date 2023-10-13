import React from "react";
import "./signup-page.css"
import Header from "../../atoms/header/header";
import BoxSignup from "../../molecules/box-signup/box-signup";
import TitleIntro from "../../atoms/title_intro/title_intro";



function SignupPage () {

    return (
        <div className="signup_page">
            <Header/>
            <TitleIntro className="text_title" text="Crie sua conta!"/>
            <BoxSignup/>
        </div>
    );
}

export default SignupPage;