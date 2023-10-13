import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const HeaderContainer = styled.header`
  padding: 1rem 1rem;
  width: 100%;
  max-width: 600px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.dark_gray};

  button {
    width:6rem;
  }
`;

export const TwitterLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;