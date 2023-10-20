import React from "react";
import {ContainerTitle} from "./styles"
import {Title} from "./styles"



function TitleIntro(props) {
    return(
        <ContainerTitle>
            <Title >{props.text}</Title>
        </ContainerTitle>
    )
}

export default TitleIntro