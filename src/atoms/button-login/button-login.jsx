import React from "react";
import "./button-login.css"




function ButtonLogin(props) {
    return(
        <div className="button_login_container">
            <button className="button_login" type="submit">{props.text}</button>
        </div>
    );
}


export default ButtonLogin;