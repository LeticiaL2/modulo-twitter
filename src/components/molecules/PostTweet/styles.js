import styled from "styled-components";

export const Container = styled.div`
  padding: 0.25rem 1rem 0;
  display: flex;
  border-bottom: 1px solid var(--border-color);
  width: 100%;
  gap: 0.75rem;
`;

export const ProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.75rem;
`;

export const FormTweet = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputTweetContainer = styled.div`
  
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
  padding-bottom: 0.5rem;
`;
