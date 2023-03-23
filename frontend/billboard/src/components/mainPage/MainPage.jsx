import React from "react";
import style from "./MainPage.module.css";
import UserRecommendation from "./UserRecommendation";

const Main = () => {
  return (
    <div className={style.background}>
      황산나래, 지혁주 Main.jsx에서 작성된 내용
      <UserRecommendation />
    </div>
  );
};

export default Main;
