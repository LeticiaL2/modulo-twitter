import React from "react";
import "./message-password.css"



function MessagePassword(props) {
    return(
        <div className="message">
            <p>{props.text}</p>
        </div>
    )
}


export default MessagePassword