import React, { useEffect } from "react";
import lottie from "lottie-web";
import animation1 from "../../assets/login/58762-game.json";
import animation2 from "../../assets/login/70218-board-game.json";
import animation3 from "../../assets/login/100832-connection-people.json";
import animation4 from "../../assets/login/79534-business-game.json";
import animation5 from "../../assets/login/118264-teenager-playing-video-games.json";

const animations = [animation1, animation2, animation3, animation4, animation5];

const Animation = (props) => {
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

  return <div id="container" style={{ width: "auto", height: "50vh" }}></div>;
};

export default Animation;
