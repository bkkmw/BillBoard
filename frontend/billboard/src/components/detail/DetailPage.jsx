import React from "react";
import GameDetail from "./GameDetail";
import GameDescription from "./GameDescription";
import GameVideo from "./GameVideo";
import GameReview from "./GameReview";
import { useLocation } from "react-router";

const Detail = () => {
  const location = useLocation();
  // console.log(location);
  const details = location.state;
  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <GameDetail details={details} />
      <hr style={{ width: "74vw" }} />
      <GameDescription details={details} />
      <hr style={{ width: "74vw" }} />
      <GameVideo key="key" details={details} />
      <hr style={{ width: "74vw" }} />
      <GameReview details={details} />
    </div>
  );
};

export default Detail;
