import React from "react";
import "./button.css"




function Button(props) {
    const {onClick} = props
    return (
        <div className="button_container">
            <button  onClick={onClick} className="button_click">{props.text}</button>
        </div>
    )
}


export default Button;