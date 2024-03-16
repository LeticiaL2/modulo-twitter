import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SwitchContainer = styled.label`
  position: relative;
  display: flex;
  width: 1.4rem;
  height: 0.5rem;
`;

export const Content = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  margin: 0;
  background: none;
  font-size: 1rem;

  @media screen and (max-width: 1024px) {
    display: none;
  }

  @media screen and (max-width: 500px) {
    display: flex;
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #2196f3;
  }

  &:checked + .slider:before {
    transform: translateX(18px);
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
