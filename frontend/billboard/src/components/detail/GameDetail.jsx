import { React, useState } from "react";
import GameRating from "./GameRating";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import stlyes from "./GameDetail.module.css";

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
    <div className={stlyes.background}>
      <img
        src={props.details.image}
        alt="5"
        style={{ height: "40vh", width: "25vw" }}
      ></img>
      <div className={stlyes.background2}>
        <div className={stlyes.background3}>
          <GameRating value={5} maxValue={10} />
          <span className={stlyes.font}>{props.details.name}</span>
        </div>
        <div
          style={{
            width: "40vw",
            height: "7vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <span className={stlyes.font2}>내 점수</span>
          <Rate
            style={{
              fontSize: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
        <div className={stlyes.background4}>
          <button
            style={{ backgroundColor: isFavorite ? "red" : "green" }}
            onClick={handleFavorite}
            className={stlyes.button}
          >
            즐겨찾기
          </button>
        </div>
        <div className={stlyes.background5}>
          <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>
            {`${props.details.minplayers} ~ ${props.details.maxplayers} 명`}
          </span>
          <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>
            {" "}
            {`${props.details.minplaytime} ~ ${props.details.maxplaytime} 분`}
          </span>
          <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>
            {props.details.minage}세 이용가
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;

// import { React, useState, useEffect } from "react";

// const GameDetail = (props) => {
//   // Get initial state of button from localStorage, or set to not clicked
//   const [isButtonClicked, setIsButtonClicked] = useState(
//     localStorage.getItem("isButtonClicked") === "true" ? true : false
//   );

//   // Save the button's clicked state to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("isButtonClicked", isButtonClicked);
//   }, [isButtonClicked]);

//   const handleButtonClick = () => {
//     // Toggle the clicked state when button is clicked
//     setIsButtonClicked(!isButtonClicked);
//   };

//   return (
//     <div>
//       <button
//         stlyes={{ backgroundColor: isButtonClicked ? "red" : "green" }}
//         onClick={handleButtonClick}
//       >
//         Click me!
//       </button>
//     </div>
//   );
// };

// export default GameDetail;
