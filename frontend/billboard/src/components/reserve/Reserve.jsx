import React from "react";
import { Link } from "react-router-dom";
import KakaoMap from "./KakaoMap";


const Reserve = () => {
  return (
    <div>
      예약하러 왔니?
      <Link to="/">메인페이지로</Link>
      <KakaoMap/>
    </div>
  );
};

export default Reserve;
