import React from "react";
import BoxLogin from "../../components/organism/box-login/box-login";
import TitleIntro from "../../components/atoms/title_intro/title_intro";
import Header from "../../components/atoms/header/header";
import { ContainerLoginPage } from "./styles";
import GlobalStyles from "../../styles/global-style";
import { i18n } from "../../translate/i18n";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext";
import SwitchButton from "../../components/atoms/button-switch/button-switch";

function LoginPage() {
  const { changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <ContainerLoginPage>
      <GlobalStyles />
      <Header onLngChange={handleLanguageChange} />

      <TitleIntro text={i18n.t("login.title")} />
      <BoxLogin />

      <SwitchButton />
    </ContainerLoginPage>
  );
}

export default LoginPage;
