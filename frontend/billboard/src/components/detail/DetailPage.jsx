import React from "react";
import GameDetail from "./GameDetail";
import GameDescription from "./GameDescription";
import GameVideo from "./GameVideo";
import GameReview from "./GameReview";
import { useLocation } from "react-router";
import { Margin } from "@mui/icons-material";

const Detail = () => {
  const location = useLocation();
  // console.log(location);
  const details = location.state;
  return (
    <div style={{ width: "100%", height: "75vh" }}>
      <GameDetail details={details} />
      <hr style={{ width: "74vw", marginBottom: "3vh" }} />
      <GameDescription details={details} />
      <hr style={{ width: "74vw", margin: "3vh 0 3vh 0" }} />
      <GameVideo key="key" details={details} />
      <hr style={{ width: "74vw", margin: "3vh 0 3vh 0" }} />
      <GameReview details={details} />
    </div>
  );
};

export default Detail;
