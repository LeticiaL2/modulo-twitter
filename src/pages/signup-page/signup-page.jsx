import React from "react";
import Header from "../../components/atoms/header/header";
import BoxSignup from "../../components/organism/box-signup/box-signup";
import TitleIntro from "../../components/atoms/title_intro/title_intro";
import { SignUpPage } from "./styles";
import GlobalStyles from "../../styles/global-style";
import { i18n } from "../../translate/i18n";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext";

function SignupPage() {
  const { changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <SignUpPage>
      <GlobalStyles />
      <Header onLngChange={handleLanguageChange} />
      <TitleIntro text={i18n.t("signup.title")} />
      <BoxSignup />
    </SignUpPage>
  );
}

export default SignupPage;
