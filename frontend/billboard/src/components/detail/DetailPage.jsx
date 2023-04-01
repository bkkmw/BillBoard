import { React, useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router";
import GameDetail from "./GameDetail";
import GameDescription from "./GameDescription";
import GameVideo from "./GameVideo";
import GameReview from "./GameReview";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import { getReviews } from "../../store/boardgames";

const Detail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const gameId = useRouteLoaderData("detail");
  const details = location.state;
  const [reviews, setReviews] = useState(null);
  // 보드게임 리뷰 조회
  useEffect(() => {
    const handleReviews = () => {
      dispatch(getReviews(gameId)).then((res) => {
        setReviews(res.payload.reviews);
      });
    };
    handleReviews();
  }, []);

  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <GameDetail details={details} />
      <hr style={{ width: "74vw" }} />
      <GameDescription details={details} />
      <hr style={{ width: "74vw" }} />
      {/* <GameVideo key="key" details={details} /> */}
      <hr style={{ width: "74vw" }} />
      <GameReview details={details} reviews={reviews} />
    </div>
  );
};

export default Detail;
