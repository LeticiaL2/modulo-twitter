import React from "react";
import { Container, ContainerSidebar, SidebarItem } from "./styles";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import Button from "../../atoms/button/button";

const Sidebar = () => {
  return (
    <Container>
      <ContainerSidebar>
        <SidebarItem>
          <ButtonIcon iconType={"XTwitter"} />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon iconType={"home"} content={"Home"} />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon iconType={"explore"} content={"Explore"} />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon iconType={"notification"} content={"Notifications"} />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon iconType={"message"} content={"Messages"} />
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
          <ButtonIcon iconType={"XTwitter"} content={"Premium"} />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon iconType={"profile"} content={"Profile"} />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon iconType={"more"} content={"More"} />
        </SidebarItem>
        <SidebarItem>
          <Button $text="Post"></Button>
        </SidebarItem>
      </ContainerSidebar>
    </Container>
  );
};

export default Sidebar;
