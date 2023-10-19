import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const Container = styled.div`
  padding: 0.25rem 1rem 0;
  display: flex;
  border-bottom: 1px solid ${colors.dark_gray};
  width: 100%;
  gap: 0.75rem;
`;

export const FormTweet = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  button {
    width: 5rem;
  }
`;

export const InputTweetContainer = styled.div`
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding-bottom: 0.5rem;

  span {
    font-size: 0.75rem;
    color: ${colors.light_gray};
  }
`;
