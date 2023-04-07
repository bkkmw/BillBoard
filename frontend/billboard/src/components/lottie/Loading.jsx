import React, { useEffect } from "react";
import lottie from "lottie-web";
import loading from "../../assets/78259-loading.json";

const Loading = (porps) => {
  
  useEffect(() => {
    const container = document.querySelector("#loading");
    lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loading,
    });
  }, []);

  return <div id="loading" style={{ width: "auto", height: "50vh" }}></div>;
};

export default Loading;
