import React, { useEffect } from "react";
import lottie from "lottie-web";
import data from "../../assets/gameroom/searching.json";

const Searching = (porps) => {

    useEffect(() => {
        const container = document.querySelector("#searching");
        lottie.loadAnimation({
            container: container,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: data,
        });
    }, []);

    return <div id="searching" style={{ width: "auto", height: "50vh" }}></div>;
};

export default Searching;
