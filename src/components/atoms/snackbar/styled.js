import styled from "styled-components";

export const StyledSnackbar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1da1f2;
  color: #fff;
  padding: 10px 20px;
  border-radius: 15px;
  transition: opacity 0.5s ease;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
`;

export const StyledMessage = styled.span`
  background: none;
  font-size: 1rem;
`;
