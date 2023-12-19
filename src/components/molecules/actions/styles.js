import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding-right: 0;
  padding-left: 0;
  margin: 0;
  width: 100%;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;
`;

export const DropdownOption = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const ButtonActionContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  cursor: pointer;
  position: relative;
`;
