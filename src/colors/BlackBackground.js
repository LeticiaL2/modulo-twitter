import styled from 'styled-components';

const BlackBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 9999;
  pointer-events: none;
`;

export default BlackBackground;