import React  from "react";
import logo  from "../../assets/logo.png"
import "./header.css"




function Header() {
    return(
        <div className="header">
            <img className="logoX" src={logo} alt="" />
        </div>
    )
}


export default Header;