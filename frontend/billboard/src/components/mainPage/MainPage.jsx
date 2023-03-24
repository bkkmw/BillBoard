import React from "react";
import style from "./MainPage.module.css";
import UserRecommend from "./UserRecommend";

const Main = () => {
  return (
    <div className={style.background}>
      <UserRecommend />
    </div>
  );
};

export default Main;
