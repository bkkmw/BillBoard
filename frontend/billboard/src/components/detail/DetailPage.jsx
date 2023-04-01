
import { React, useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router";

import GameDetail from "./GameDetail";
import GameDescription from "./GameDescription";
import GameVideo from "./GameVideo";
import GameReview from "./GameReview";
import { useLocation } from "react-router";

import { useDispatch } from "react-redux";

import { getReviews } from "../../store/boardgames";

import { Margin } from "@mui/icons-material";


const Detail = ({ gameDetail }) => {
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

  // let details;
  // // console.log(location.state);
  // if (gameDetail) {
  //   details = gameDetail;
  // } else {
  //   details = location.state;
  // }


  return (
    <div style={{ width: "100%", height: "75vh" }}>
      <GameDetail details={details} />
      <hr style={{ width: "74vw", marginBottom: "3vh" }} />
      <GameDescription details={details} />

      <hr style={{ width: "74vw", margin: "3vh 0 3vh 0" }} />
      {/* <GameVideo key="key" details={details} /> */}
      <hr style={{ width: "74vw", margin: "3vh 0 3vh 0" }} />
      <GameReview details={details} reviews={reviews} />

    </div>
  );
};

export default Detail;
