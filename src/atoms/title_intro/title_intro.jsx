
import React from "react";
import "./title_intro.css"




function TitleIntro(props) {
    return(
        <div className="central_title">
            <h1 className="title_container">{props.text}</h1>
        </div>
    )
}

export default TitleIntro