import { React, useState } from "react";
import GameRating from "./GameRating";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import style from "./GameDetail.module.css";

import { createFavorites, deleteFavorites } from "../../store/boardgames";

import { useSelector, useDispatch } from "react-redux";

const GameDetail = (props) => {
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.user);
  // 즐겨찾기 등록, 해제
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    const reqData = { gameId: props.details.gameId, userId: loginUser.userId };
    {
      if (isFavorite === false) {
        dispatch(createFavorites(reqData)).then(() => {
          setIsFavorite(true);
        });
      } else {
        dispatch(deleteFavorites(reqData)).then(() => {
          setIsFavorite(false);
        });
      }
    }
  };

  // console.log(props.details);
  return (
    <div className={style.background}>
      <img
        src={props.details.image}
        alt="5"
        style={{ height: "40vh", width: "25vw" }}
      ></img>
      <div className={style.background2}>
        <div className={style.background3}>
          <GameRating value={5} maxValue={10} />
          <span className={style.font}>{props.details.name}</span>
        </div>
        <div>
          <span className={style.font2}>My rating</span>
          <Rate style={{ fontSize: "3rem" }} />
        </div>
        <div className={style.background4}>
          <button className={style.button}>방 개설</button>
          <button
            style={{ backgroundColor: isFavorite ? "red" : "green" }}
            onClick={handleFavorite}
            className={style.button}
          >
            즐겨찾기
          </button>
        </div>
        <div className={style.background5}>
          <span className={style.font2}>
            {`${props.details.minplayers} ~ ${props.details.maxplayers} 명`}
          </span>
          <span className={style.font2}>
            {" "}
            {`${props.details.minplaytime} ~ ${props.details.maxplaytime} 분`}
          </span>
          <span className={style.font2}>{props.details.minage}세 이용가</span>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
