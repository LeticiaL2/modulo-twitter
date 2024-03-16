import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 10px;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    color: ${(props) => (props.theme === "dark" ? "white" : "black")};
    background-color: ${(props) =>
      props.theme === "dark" ? "black" : "white"};
  }


  
`;

const ThemedGlobalStyles = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? "dark" : "light";

  return <GlobalStyles theme={theme} />;
};

export default ThemedGlobalStyles;
