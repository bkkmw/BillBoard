import React, { useEffect } from "react";
import lottie from "lottie-web";
import animation1 from "../../assets/game/26970-gard-game.json";
import animation2 from "../../assets/game/75379-lebleby-games-demo-animation.json";
import animation3 from "../../assets/game/112229-game-asset.json";
import animation4 from "../../assets/game/120311-game.json";

const animations = [animation1, animation2, animation3, animation4];

const Animation4 = (props) => {
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

  return (
    <div
      id="container"
      style={{
        width: "40vw",
        height: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    ></div>
  );
};

export default Animation4;
