import React from "react";
import GameRating from "./GameRating";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import style from "./GameDetail.module.css";
import { height } from "@mui/system";
import { Margin } from "@mui/icons-material";

const GameDetail = () => {
  return (
    <div className={style.background}>
      <img
        src="https://picsum.photos/800/302/?random"
        alt="5"
        style={{ height: "40vh", width: "25vw" }}
      ></img>
      <div className={style.background2}>
        <div className={style.background3}>
          <GameRating value={5} maxValue={10} />
          <span className={style.font}>Drangon Eclipse</span>
        </div>
        <div>
          <span className={style.font2}>My rating</span>
          <Rate style={{ fontSize: "3rem" }} />
        </div>
        <div className={style.background4}>
          <button className={style.button}>방 개설</button>
          <button className={style.button}>즐겨찾기</button>
        </div>
        <div className={style.background5}>
          <span className={style.font2}>1~2 Players</span>
          <span className={style.font2}>60~120 min</span>
          <span className={style.font2}>Age 12+</span>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
