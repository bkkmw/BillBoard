import React from "react";
import GameDetail from "./GameDetail";
import GameDescription from "./GameDescription";
import GameVideo from "./GameVideo";
import GameReview from "./GameReview";
import { useRouteLoaderData } from "react-router";

const Detail = () => {
  const gameId = useRouteLoaderData("detail");
  return (
    <div>
      
      <GameDetail />
      <hr style={{ width: "74vw" }} />
      <GameDescription />
      <hr style={{ width: "74vw" }} />
      {/* <GameVideo key="key" /> */}
      <hr style={{ width: "74vw" }} />
      <GameReview />
    </div>
  );
};

export default Detail;
