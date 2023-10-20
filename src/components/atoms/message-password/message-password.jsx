import React from "react";
import {ContainerMessage} from "./styles"
import {PasswordMessage} from "./styles"


function MessagePassword(props) {
    return(
        <ContainerMessage>
            <PasswordMessage isValid={props.isValid}>{props.text}</PasswordMessage>
        </ContainerMessage>
    )
}


export default MessagePassword