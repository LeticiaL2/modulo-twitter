import React, { Children } from "react";
import "./user-photo.css";
import { PhotoUserContainer, PhotoUser } from "./style";



function UserPhoto(props) {

    return(
        <PhotoUserContainer>
            < PhotoUser alt="Imagem do botão"/>
        </PhotoUserContainer>
    );
};


export default UserPhoto;