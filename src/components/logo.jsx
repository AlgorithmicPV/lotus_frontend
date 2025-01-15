import React from "react";
import "../assets/styles/logo.css";
import logo_icon from "../assets/icons/lotus-logo.svg";

function Logo(){
    return(
        <>
            <div className="logo">
                <p className="l">L</p>
                <img src={logo_icon} />
                <p className="tus">tus</p>
                <p className="v">. 1.0</p>
            </div>
        </>
    )
}

export default Logo;