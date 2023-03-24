import React from "react";
import style from "./GameDescription.module.css";

const GameDescription = () => {
  return (
    <div className={style.background2}>
      <span className={style.font}>Description</span>
      <span style={{ width: "74vw" }} className={style.font2}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
        excepturi voluptatem ratione tenetur! Modi, ducimus exercitationem,
        dolores corrupti blanditiis cupiditate adipisci voluptatum repudiandae
        impedit tenetur asperiores ullam quod maiores quas? Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Similique excepturi voluptatem
        ratione tenetur! Modi, ducimus exercitationem, dolores corrupti
        blanditiis cupiditate adipisci voluptatum repudiandae impedit tenetur
        asperiores ullam quod maiores quas?
      </span>
    </div>
  );
};

export default GameDescription;
