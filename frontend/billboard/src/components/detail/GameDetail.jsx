import { React, useState, useRef } from "react";
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
  // Get initial isFavorite value from localStorage or set to false if not found
  const initialIsFavorite =
    JSON.parse(localStorage.getItem(props.details.gameId)) || false;
  // Create a mutable reference to isFavorite using useRef
  const isFavoriteRef = useRef(initialIsFavorite);
  // Set the state of isFavorite to the value of the reference
  const [isFavorite, setIsFavorite] = useState(isFavoriteRef.current);

  const handleFavorite = () => {
    const reqData = { gameId: props.details.gameId, userId: loginUser.userId };
    if (isFavoriteRef.current === false) {
      dispatch(createFavorites(reqData)).then(() => {
        isFavoriteRef.current = true;
        setIsFavorite(true);
        // Save the updated isFavorite value to localStorage
        localStorage.setItem(props.details.gameId, JSON.stringify(true));
      });
    } else {
      dispatch(deleteFavorites(reqData)).then(() => {
        isFavoriteRef.current = false;
        setIsFavorite(false);
        // Save the updated isFavorite value to localStorage
        localStorage.setItem(props.details.gameId, JSON.stringify(false));
      });
    }
  };

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
//         style={{ backgroundColor: isButtonClicked ? "red" : "green" }}
//         onClick={handleButtonClick}
//       >
//         Click me!
//       </button>
//     </div>
//   );
// };

// export default GameDetail;
