import React, { useEffect } from "react";
import lottie from "lottie-web";
import noting from "../../assets/126314-empty-box-by-partho.json";

const Noting = (porps) => {
  const container = document.querySelector("#container");
  useEffect(() => {
    lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: noting,
    });
  }, []);

  return <div id="container" style={{}}></div>;
};

export default Noting;
