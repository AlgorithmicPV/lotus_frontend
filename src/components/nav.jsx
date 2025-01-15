import React, { useEffect } from "react";
import home_ico from "../assets/icons/home.svg";
import about_ico from "../assets/icons/info.svg";
import lotus_ico from "../assets/icons/lotus-logo.svg";
import map_ico from "../assets/icons/map.svg";
import currency_ico from "../assets/icons/rupee-sign.svg";
import translator_ico from "../assets/icons/translator.svg";
import "../assets/styles/nav.css";
import { useLocation } from "react-router-dom";

function Customlink({ isActive, href, image, tooltip }) {
  return (
    <li className={isActive ? "active" : ""}>
      <a href={href}>
        <img src={image} alt={tooltip} />
        <span className="tooltip">{tooltip}</span>
      </a>
    </li>
  );
}

function Navbar() {
  const location = useLocation();

  return (
    <>
      <div
        className={
          location.pathname === "/home" || location.pathname === "/"
            ? "hide-nav"
            : "nav"
        }
      >
        <ul>
          <Customlink
            href="/home"
            image={home_ico}
            tooltip=""
            isActive={location.pathname === "/home"}
          />
          <Customlink
            href="/about"
            image={about_ico}
            tooltip=""
            isActive={location.pathname === "/about"}
          />
          <Customlink
            href="/lotus-chat"
            image={lotus_ico}
            tooltip=""
            isActive={location.pathname === "/lotus-chat"}
          />
          <Customlink
            href="/currency-converter"
            image={currency_ico}
            tooltip=""
            isActive={location.pathname === "/currency-converter"}
          />
          <Customlink
            href="/translator"
            image={translator_ico}
            tooltip=""
            isActive={location.pathname === "/translator"}
          />
        </ul>
      </div>
    </>
  );
}

export default Navbar;
