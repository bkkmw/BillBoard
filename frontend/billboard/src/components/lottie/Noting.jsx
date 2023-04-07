import React, { useEffect } from "react";
import lottie from "lottie-web";
import noting from "../../assets/126314-empty-box-by-partho.json";

const Noting = (porps) => {

  useEffect(() => {
    const container = document.querySelector("#nothing");
    lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: noting,
    });
  }, []);

  return <div id="nothing" style={{ width: "auto", height: "50vh" }}></div>;
};

export default Noting;
