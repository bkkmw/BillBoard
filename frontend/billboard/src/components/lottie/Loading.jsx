import React, { useEffect } from "react";
import lottie from "lottie-web";
import loading from "../../assets/78259-loading.json";

const Loading = (porps) => {
  const container = document.querySelector("#container");
  useEffect(() => {
    lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loading,
    });
  }, []);

  return <div id="container" style={{}}></div>;
};

export default Loading;
