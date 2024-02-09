import { useRef, React, useContext } from "react";
import { AuthContext } from "../../../contexts/auth";
import ButtonIcon from "../../atoms/button-icon/button-icon";
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
              <ButtonIcon iconType={"profile"} content={"Profile"} />
            </SidebarItem>

            <SidebarItem>
              <ButtonIcon iconType={"XTwitter"} content={"Premium"} />
            </SidebarItem>

            <SidebarItem>
              <ButtonIcon iconType={"list"} content={"Lists"} />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon iconType={"bookmark"} content={"Bookmarks"} />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon iconType={"communities"} content={"Communities"} />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon iconType={"monetization"} content={"Monetization"} />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon iconType={"ads"} content={"Ads"} />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon
                iconType={"settings"}
                content={"Settings and privacy"}
              />
            </SidebarItem>
            <SidebarItem>
              <ButtonIcon
                iconType={"logout"}
                content={"Log out"}
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
