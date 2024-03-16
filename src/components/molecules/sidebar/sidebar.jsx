import React from "react";
import { Container, ContainerSidebar, SidebarItem } from "./styles";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import Button from "../../atoms/button/button";
import { i18n } from "../../../translate/i18n";
import SwitchButton from "../../atoms/button-switch/button-switch";

const Sidebar = () => {
  return (
    <Container>
      <ContainerSidebar>
        <SidebarItem>
          <ButtonIcon iconType={"XTwitter"} />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon iconType={"home"} content={i18n.t("sideBar.Home")} />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon
            iconType={"explore"}
            content={i18n.t("sideBar.Explore")}
          />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon
            iconType={"notification"}
            content={i18n.t("sideBar.Notification")}
          />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon
            iconType={"message"}
            content={i18n.t("sideBar.Message")}
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
            iconType={"XTwitter"}
            content={i18n.t("sideBar.Premium")}
          />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon
            iconType={"profile"}
            content={i18n.t("sideBar.Profile")}
          />
        </SidebarItem>
        <SidebarItem>
          <ButtonIcon iconType={"more"} content={i18n.t("sideBar.More")} />
        </SidebarItem>
        <SidebarItem>
          <Button $text={i18n.t("sideBar.Post")}></Button>
        </SidebarItem>

        <SidebarItem>
          <SwitchButton />
        </SidebarItem>
      </ContainerSidebar>
    </Container>
  );
};

export default Sidebar;
