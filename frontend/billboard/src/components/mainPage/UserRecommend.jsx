import React from "react";
import { Carousel } from "3d-react-carousal";

const UserRecommend = () => {
  let slides = [
    <img
      src="https://picsum.photos/800/300/?random"
      alt="1"
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
    />,
    <img
      src="https://picsum.photos/800/301/?random"
      alt="2"
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
    />,
    <img
      src="https://picsum.photos/800/302/?random"
      alt="3"
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
    />,
    <img
      src="https://picsum.photos/800/303/?random"
      alt="4"
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
    />,
    <img
      src="https://picsum.photos/800/304/?random"
      alt="5"
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
    />,
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title"></h1>
      </header>

      <p>유저별 추천</p>
      <Carousel slides={slides} autoplay={true} interval={2000} />
    </div>
  );
};

export default UserRecommend;
