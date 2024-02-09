import styled from "styled-components";
import { PiUserCircleLight } from "react-icons/pi";

export const PhotoUserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
`;

export const PhotoUser = styled(PiUserCircleLight)`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  color: white;
`;
