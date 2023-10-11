import React from "react";
import "./button.css"




function Button(props) {
    const {onClick} = props
    return (
    <button  onClick={onClick} className="post_button">{props.text}</button>
    )
}


export default Button;