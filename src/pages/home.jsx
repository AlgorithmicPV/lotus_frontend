import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../assets/styles/home.css";
import logo_icon from "../assets/icons/lotus-logo.svg";
import sigiriya_img from "../assets/images/sigiriya.jpg";
import mobile_phone from "../assets/images/frame.png";
import beaches from "../assets/images/beaches.jpg";
import dalada_maligaya from "../assets/images/siri-dalalada-maligaya.jpg";
import buddha_img from "../assets/images/buddha-img.jpg";
import light_house from "../assets/images/light-house.webp";
import lotus_tower from "../assets/images/lotus-tower.jpg";
import nine_arch from "../assets/images/nine-arch.jpg";
import anuradhapura from "../assets/images/Anuradhapura.jpg";
import vatadagaya from "../assets/images/vatadagaya.jpg";
import axios from "axios";

function HomePage() {
  const [count, setCount] = useState(0);
  const images = [
    sigiriya_img,
    buddha_img,
    light_house,
    lotus_tower,
    nine_arch,
    vatadagaya,
    dalada_maligaya,
    anuradhapura,
    beaches,
  ];

  var start_the_backend = "start";

  useEffect(() => {
    axios.post("https://lotus-backend-jaek.onrender.com/", {
      start: start_the_backend,
    });
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 8) {
        setCount(count + 1);
      } else {
        setCount(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <motion.div
        className="home-cont"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="left-side">
          <div className="h-logo">
            <p className="l">L</p>
            <img className="logo-img" src={logo_icon} />
            <p className="tus">tus</p>
            <p className="v">.</p>
          </div>
          <div className="down">
            <p className="txt">
              Bringing Sri Lanka closer to you, one smart tool at a time.
            </p>
            <a
              style={{
                cursor: "default",
              }}
              href="/lotus-chat"
            >
              <button className="try-btn">Try this now</button>
            </a>
          </div>
        </div>
        <div className="right-side">
          <div className="smartphone">
            <div className="small-cont">
              <div className="small-cont-logo">
                <p className="small-cont-l">L</p>
                <img className="small-cont-logo-img" src={logo_icon} />
                <p className="small-cont-tus">tus</p>
                <p className="small-cont-v">.</p>
              </div>
              <div className="small-cont-down">
                <p>
                  Bringing Sri Lanka closer to you, one smart tool at a time.
                </p>
                <a
                  style={{
                    cursor: "default",
                  }}
                  href="/lotus-chat"
                >
                  <button>Try this now</button>
                </a>
              </div>
            </div>

            <motion.img
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  default: { type: "spring" },
                  opacity: { ease: "linear" },
                },
              }}
              src={images[count]}
              alt="img"
              className="img-cont"
            ></motion.img>
            <img src={mobile_phone} className="frame" />
          </div>
          <div className="block"></div>
        </div>
      </motion.div>
    </>
  );
}

export default HomePage;
