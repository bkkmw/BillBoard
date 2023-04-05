import { React, useState, useRef, useEffect } from "react";
import GameRating from "./GameRating";
import { Link } from "react-router-dom";
import { Form, Rate } from "antd";
import stlyes from "./GameDetail.module.css";
import {
  createFavorites,
  deleteFavorites,
  getUserReviews,
} from "../../store/boardgames";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user";

const GameDetail = (props) => {
  const inputRef = useRef();
  const userId = useSelector(selectUser).loginUser.userId;
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.user);
  const gameId = props.details.gameId;
  useEffect(() => {
    dispatch(getUserReviews({ userId: userId }))
      .then((res) => {
        for (const review of res.payload.reviews) {
          if (review.gameId === gameId) {
            setRating(review.rating);
            // console.log(review.rating)

            // 디폴트 값
            inputRef.current?.setFieldsValue({
              rating: `${review.rating}`,
            });
            break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // console.log(inputRef);
  }, [inputRef]);

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
  // 내 평점
  // const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  // localStorage.setItem("reviews", JSON.stringify(existingReviews));
  // console.log(existingReviews[existingReviews.length - 1]["rating"]);

  return (
    <div className={stlyes.background}>
      <img
        src={props.details.image}
        alt="5"
        style={{ height: "40vh", width: "25vw" }}
      ></img>
      <div className={stlyes.background2}>
        <div className={stlyes.background3}>
          <GameRating value={props.details.average} maxValue={10} />
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
          <Form ref={inputRef}>
            <Form.Item name="rating">
              <Rate
                count={10}
                style={{
                  fontSize: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                id="myRating"
                disabled={true}
              />
            </Form.Item>
          </Form>
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
