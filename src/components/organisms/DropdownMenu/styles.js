import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const Container = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background-color: ${colors.black};
  border-radius: 0.75rem;
  border: 1px solid ${colors.light_gray};
  box-shadow: 0px 0px 6px 1px ${colors.light_gray};
  z-index: 10;
`
