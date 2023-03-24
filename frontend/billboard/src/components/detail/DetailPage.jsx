import React from "react";
import GameDetail from "./GameDetail";
import GameDescription from "./GameDescription";
import GameVide from "./GameVide";
import GameReview from "./GameReview";

const Detail = () => {
  return (
    <div>
      <GameDetail />
      <hr style={{ width: "74vw" }} />
      <GameDescription />
      <hr style={{ width: "74vw" }} />
      <GameVide />
      <hr style={{ width: "74vw" }} />
      <GameReview />
    </div>
  );
};

export default Detail;
