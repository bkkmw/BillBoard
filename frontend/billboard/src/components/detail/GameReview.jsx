import React from "react";
import style from "./GameReview.module.css";
import GamePagination from "./GamePagination";

const GameReview = () => {
  return (
    <div>
      <span className={style.font}>Review</span>
      <GamePagination />
    </div>
  );
};

export default GameReview;
