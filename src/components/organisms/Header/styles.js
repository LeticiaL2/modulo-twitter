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

  .logout-icon {
    width: 3.6rem;
  }

  .logout-icon > svg {
    height: 18px;
    width: 18px;
  }

  .logout-text {
    display: none;
  }

  @media (min-width: 425px) {
    .logout-icon {
      display: none;
    }

    .logout-text {
      display: block;
      width: 6rem;
    }
  }
`

export const TwitterLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;