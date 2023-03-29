import React from "react";
import style from "./MainPage.module.css";
import UserRecommend from "./UserRecommend";
import GameSearch from "./GameSearch";
import GanreSearch from "./GanreSearch";
// import Rank from "./Rank";
// import Grade from "./Grade";
// import Review from "./Review";
// import Recent from "./Recent";
// import Level from "./Level";
import Carousel from "./Carousel";
const Main = () => {
  return (
    <div className={style.background}>
      <span>유저별</span>
      <UserRecommend />
      <GameSearch />
      <GanreSearch />
      <div>
        <span>랭킹순</span>
        <Carousel />
        <span>평점순</span>
        <Carousel />
        <span>최신순</span>
        <Carousel />
        <span>난이도순</span>
        <Carousel />
      </div>
    </div>
  );
};

export default Main;
