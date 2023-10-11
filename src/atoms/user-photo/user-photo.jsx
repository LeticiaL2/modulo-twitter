import React from "react";
import "./user-photo.css";




function UserPhoto(props) {

    return(
        <div>
            <img className="profile_icon" src={props.src} alt="Imagem do botão"/>
        </div>
    );
};


export default UserPhoto;