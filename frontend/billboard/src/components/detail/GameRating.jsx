import { height } from "@mui/system";
import React from "react";
import style from "./GameRating.module.css";

export default function GameRating({ value, maxValue }) {
  const val = (value / maxValue) * 100;
  const deg = (180 / 100) * val;
  return (
    <div className={style.indicator} style={{ width: "10vw", height: "10vh" }}>
      <span className={style.bar} style={{ transform: `rotate(${deg}deg)` }} />
      <span className={style.result}>
        <span>{value}</span>
      </span>
    </div>
  );
}
