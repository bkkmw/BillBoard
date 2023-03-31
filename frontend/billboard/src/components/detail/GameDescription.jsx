import React from "react";
import style from "./GameDescription.module.css";

const GameDescription = (props) => {
  return (
    <div className={style.background2}>
      <span className={style.font}>Description</span>
      <span style={{ width: "74vw" }} className={style.font2}>
        {props.details.description}
      </span>
    </div>
  );
};

export default GameDescription;
