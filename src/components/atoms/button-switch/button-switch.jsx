import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../redux/ducks/theme";
import {
  Content,
  Container,
  SwitchContainer,
  SwitchInput,
  Slider,
} from "./styles";

const SwitchButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  //<SwitchLabel>{darkMode ? "DarkMode" : "LightMode"}</SwitchLabel>

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Container>
      <SwitchContainer>
        <SwitchInput
          type="checkbox"
          checked={darkMode}
          onChange={handleToggleTheme}
        />
        <Slider className="slider" />
      </SwitchContainer>
      <Content>Lights out</Content>
    </Container>
  );
};

export default SwitchButton;
