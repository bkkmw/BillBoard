import React, { useEffect } from "react";
import lottie from "lottie-web";
import animation1 from "../../assets/map/44851-find-pin-map.json";
import animation2 from "../../assets/map/45382-pin-on-map.json";
import animation3 from "../../assets/map/54970-world-map.json";
import animation4 from "../../assets/map/108414-geography-teacher.json";

const animations = [animation1, animation2, animation3, animation4];

const Animation3 = (props) => {
  useEffect(() => {
    const container = document.querySelector("#container");
    const randomIndex = Math.floor(Math.random() * animations.length);
    lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animations[randomIndex],
    });
  }, []);

  return <div id="container" style={{ width: "auto", height: "30vh" }}></div>;
};

export default Animation3;
