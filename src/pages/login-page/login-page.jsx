import React from "react";
import "./login-page.css"
import BoxLogin from "../../molecules/box-login/box-login";
import TitleIntro from "../../atoms/title_intro/title_intro";
import Header from "../../atoms/header/header";


function LoginPage () {
    

    return (
        
        <div className="login_page"> 
            <Header/>
            <TitleIntro text="Acontecendo agora"/>
            <BoxLogin/>
        </div>
    );
}

export default LoginPage;
