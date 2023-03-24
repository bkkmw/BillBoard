import React from "react";
import style from "./MainPage.module.css";
import UserRecommend from "./UserRecommend";
import GameSearch from "./GameSearch";

const Main = () => {
  return (
    <div className={style.background}>
      <UserRecommend />
      <GameSearch />
    </div>
  );
};

export default Main;
