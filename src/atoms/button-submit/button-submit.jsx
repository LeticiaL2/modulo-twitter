import React from "react";
import "./button-submit.css"




function ButtonSubmit(props) {
    return(
        <div className="button_submit_container">
            <button className="button_submit" type="submit">{props.text}</button>
        </div>
    );
}


export default ButtonSubmit;