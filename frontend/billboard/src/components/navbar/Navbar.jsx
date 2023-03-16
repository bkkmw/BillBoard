import React from "react";
import { Link } from "react-router-dom";

// 네브바 최상단에 고정해서 스크롤 내려도 최상단으로 할것

const Navbar = () => {
  return (
    <div>
      <Link to={"/login"}>로그인 </Link>
      <Link to={"/singup"}>회원가입 </Link>
      <Link to={"/gameroom"}>게임방 </Link>
      <Link to={"/reserve"}>예약 </Link>
      <Link to={"/profile"}>프로필페이지</Link>
    </div>
  );
};

export default Navbar;
