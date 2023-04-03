import { React, useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router";

import GameDetail from "./GameDetail";
import GameDescription from "./GameDescription";
import GameVideo from "./GameVideo";
import GameReview from "./GameReview";
import { useLocation } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { getReviews, getUserReviews } from "../../store/boardgames";
import { getDetails } from "../../store/boardgames";
import { Margin } from "@mui/icons-material";
import { selectUser } from "../../store/user";

const Detail = ({ gameDetail, propGameId }) => {
  const [details, setDetails] = useState()
  let gameId;
  const location = useLocation();

  const dispatch = useDispatch();
  const getDetailInfo = (gameId) => {
    console.log(gameId)
    dispatch(getDetails(gameId)).then((res) => {
      console.log(res)
      setDetails(res.payload.boardgame)
    })
  }
  useEffect(()=>{
    if (propGameId) {
      console.log(1)
      gameId = propGameId
      getDetailInfo(propGameId)
    } else if (gameDetail) {
      setDetails(gameDetail)
      gameId = gameDetail.gameId;
    } else if (location.state.isProps) {
      gameId = location.state.gameId
      getDetailInfo(location.state.gameId)
    } else {
      setDetails(location.state);
      gameId = location.state.gameId
    }
  },[propGameId, gameDetail])



  // const details = location.state;
  const [reviews, setReviews] = useState(null);
  // 보드게임 리뷰 조회
  useEffect(() => {
    const handleReviews = () => {
      dispatch(getReviews(gameId)).then((res) => {
        setReviews(res.payload.reviews);
        console.log(res);
      });
    };
    handleReviews();

  }, []);



  return (
    <>{details&&
    <div style={{ width: "100%", height: "75vh" }}>
      <GameDetail details={details} />
      <hr style={{ width: "74vw", marginBottom: "3vh" }} />
      <GameDescription details={details} />
      <hr style={{ width: "74vw", margin: "3vh 0 3vh 0" }} />
      {/* <GameVideo key="key" details={details} /> */}
      <hr style={{ width: "74vw", margin: "3vh 0 3vh 0" }} />
      <GameReview details={details} reviews={reviews} />

    </div>}</>
  );
};

export default Detail;
