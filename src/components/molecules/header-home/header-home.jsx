import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPhoto from "../../atoms/user-photo/user-photo";
import {
  HeaderContainer,
  LogoX,
  ContainerPhoto,
  ContainerLogo,
  ContainerLogout,
  ContainerButtonProfile,
} from "./styles";
import Button from "../../atoms/button/button";
import { AuthContext } from "../../../contexts/auth";
import ModalTemplate from "../../template/modal-template/modal-template";
import SidebarMobile from "../sidebar-mobile/sidebar-mobile";

function HeaderHome({ buttonText }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleButtonClick = () => {
    if (buttonText === "Sair") {
      handleLogout();
    } else {
      navigate(-1);
    }
  };

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <HeaderContainer>
      <ContainerPhoto>
        <ContainerButtonProfile onClick={handleSidebar}>
          <UserPhoto />
        </ContainerButtonProfile>
      </ContainerPhoto>

      <ContainerLogo>
        <LogoX />
      </ContainerLogo>

      <ContainerLogout>
        <Button
          $border="1px solid white"
          $backgroundColor="black"
          color="#00acee"
          $text={buttonText}
          onClick={handleButtonClick}
        />
      </ContainerLogout>

      <SidebarMobile showSideBarMobile={showSidebar} onClose={setShowSidebar} />
      <SidebarMobile />
    </HeaderContainer>
  );
}

export default HeaderHome;
