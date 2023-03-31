import React from "react";
import GameDetail from "./GameDetail";
import GameDescription from "./GameDescription";
import GameVideo from "./GameVideo";
import GameReview from "./GameReview";

const Detail = () => {
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
