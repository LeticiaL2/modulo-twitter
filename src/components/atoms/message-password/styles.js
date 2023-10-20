import styled from "styled-components";



export const ContainerMessage = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const PasswordMessage = styled.p`
  color: ${(props) => (props.isValid ? "green" : "red")};
  font-size: 0.8em;
  font-weight: bold;
`