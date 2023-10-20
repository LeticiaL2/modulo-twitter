import styled from 'styled-components';


export const Icon = styled.div`
  margin-right: 5px; 
  font-size: 1rem; 
  color: rgb(113, 118, 123);
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0;
  outline: none;
  transition: color 0.2s;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0px;
  margin: 0;
  justify-content: center;
  flex-wrap: wrap;

  outline: none;
  position: relative; 

  /*&:hover {
    ${Icon} {
      color: ${({ iconType }) => getIconColor(iconType)};
    }
  }

  &:active {
    ${Icon} {
      color: ${({ iconType }) => getIconColor(iconType)};
    }
  }
  */

`;



function getIconColor(iconType) {
  switch (iconType) {
    case 'reply':
      return 'blue';
    case 'retweet':
      return 'green';
    case 'heart':
      return 'red';
    case 'eye':
      return 'blue';
    default:
      return 'inherit';
  }
}

export const CountContainer = styled.div`
  pointer-events: none; 
  color: white;
  padding: 0;
  font-size: 1rem;
  color: rgb(113, 118, 123);
`;

export const Count = styled.span`
  font-size: 1rem; 
  color: white; 
  padding: 0;
  color: rgb(231, 233, 234);

`;

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
`