import styled from "styled-components";

export const Icon = styled.div`
  font-size: 1rem;
  color: white;
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0;
  outline: none;
  border: none;
  width: 6vh;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  padding: ${(prop) => (prop.$padding ? prop.$padding : "3px")};
  margin: 0;
  justify-content: center;
  flex-wrap: wrap;
  border: none;
  outline: none;
  position: relative;
`;

function getIconColor(iconType) {
  switch (iconType) {
    case "reply":
      return "blue";
    case "retweet":
      return "green";
    case "heart":
      return "red";
    case "eye":
      return "blue";
    default:
      return "inherit";
  }
}

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  ${Button}:hover & {
    ${Icon} {
      color: ${({ iconType }) => getIconColor(iconType)};
    }
  }

  ${Button}:active & {
    ${Icon} {
      color: ${({ iconType }) => getIconColor(iconType)};
    }
  }
`;
