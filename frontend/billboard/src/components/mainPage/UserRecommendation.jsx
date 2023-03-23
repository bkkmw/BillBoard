// import React from "react";
// import { Carousel } from "3d-react-carousal";

// const UserRecommendation = () => {
//   let slides = [
//     <img
//       src="https://picsum.photos/800/300/?random"
//       alt="1"
//       style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
//     />,
//     <img
//       src="https://picsum.photos/800/301/?random"
//       alt="2"
//       style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
//     />,
//     <img
//       src="https://picsum.photos/800/302/?random"
//       alt="3"
//       style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
//     />,
//     <img
//       src="https://picsum.photos/800/303/?random"
//       alt="4"
//       style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
//     />,
//     <img
//       src="https://picsum.photos/800/304/?random"
//       alt="5"
//       style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
//     />,
//   ];

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1 className="App-title"></h1>
//       </header>

//       <p>유저별 추천</p>
//       <Carousel slides={slides} autoplay={true} interval={2000} />
//     </div>
//   );
// };

// export default UserRecommendation;

import React, { useEffect } from "react";
import Swiper from "swiper/bundle";

import "swiper/swiper-bundle.min.css";

const UserRecommendation = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 3,
      direction: getDirection(),
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        resize: function () {
          swiper.changeDirection(getDirection());
        },
      },
    });

    function getDirection() {
      const windowWidth = window.innerWidth;
      const direction = windowWidth <= 760 ? "vertical" : "horizontal";
      return direction;
    }

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {/* <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div>
        <div className="swiper-slide">Resize me!</div> */}
        <img
          src="https://picsum.photos/800/304/?random"
          alt="5"
          className="swiper-slide"
        />
        ,
        <img
          src="https://picsum.photos/800/300/?random"
          alt="5"
          className="swiper-slide"
        />
        ,
        <img
          src="https://picsum.photos/800/301/?random"
          alt="5"
          className="swiper-slide"
        />
        ,
        <img
          src="https://picsum.photos/800/302/?random"
          alt="5"
          className="swiper-slide"
        />
        ,
        <img
          src="https://picsum.photos/800/303/?random"
          alt="5"
          className="swiper-slide"
        />
        ,
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default UserRecommendation;
