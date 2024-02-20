import { useRef, React, useContext } from "react";
import { AuthContext } from "../../../contexts/auth";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import { i18n } from "../../../translate/i18n";
import Button from "../../atoms/button/button";
import {
  Container,
  HeaderContainer,
  ContainerSidebarMobile,
  SidebarItem,
  NameProfile,
  UserName,
} from "./styles";
import UserPhoto from "../../atoms/user-photo/user-photo";

const SidebarMobile = ({ showSideBarMobile, onClose, children }) => {
  const modalRef = useRef();
  const { logout } = useContext(AuthContext);

  function closeSidebarMobile(e) {
    if (modalRef.current === e.target) {
      onClose(false);
    }
  }

  const handleLogout = () => {
    logout();
  };

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("userName", user.name);
  return (
    <>
      {showSideBarMobile ? (
        <Container ref={modalRef} onClick={closeSidebarMobile}>
          <ContainerSidebarMobile>
            <HeaderContainer>
              <UserPhoto />
              <NameProfile>{user.name}</NameProfile>
              <UserName>{user.usuario}</UserName>
            </HeaderContainer>
            <SidebarItem>
              <ButtonIcon
                iconType={"profile"}
                content={i18n.t("sideBar.Profile")}
              />
            </SidebarItem>

            <SidebarItem>
              <ButtonIcon
                iconType={"XTwitter"}
                content={i18n.t("sideBar.Premium")}
              />
            </SidebarItem>

            <SidebarItem>
              <ButtonIcon iconType={"list"} content={i18n.t("sideBar.List")} />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon
                iconType={"bookmark"}
                content={i18n.t("sideBar.Bookmark")}
              />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon
                iconType={"communities"}
                content={i18n.t("sideBar.Communities")}
              />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon
                iconType={"monetization"}
                content={i18n.t("sideBar.Monetization")}
              />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon iconType={"ads"} content={i18n.t("sideBar.Ads")} />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon
                iconType={"settings"}
                content={i18n.t("sideBar.Settings")}
              />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon
                iconType={"logout"}
                content={i18n.t("sideBar.Logout")}
                onClick={handleLogout}
              />
            </SidebarItem>
          </ContainerSidebarMobile>
        </Container>
      ) : null}
    </>
  );
};

export default SidebarMobile;
