import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

body {
  -webkit-font-smoothing: antialiased;
  background-color: ${colors.black};
  color: ${colors.white};
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
  border: 0;
  background: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

html, body, #root {
  width: 100%;
  height: 100%;
  max-height: 100vh;
  max-width: 100vw;
}
`;

export default GlobalStyle;