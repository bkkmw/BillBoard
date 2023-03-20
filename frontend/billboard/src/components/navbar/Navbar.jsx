import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Box } from "@mui/material";
// 네브바 최상단에 고정해서 스크롤 내려도 최상단으로 할것

const Navbar = () => {
  return (
    <Box position="static">
      <AppBar>
        <Link style={{ color: "white" }} to={"/login"}>
          로그인{" "}
        </Link>
        <Link style={{ color: "white" }} to={"/singup"}>
          회원가입{" "}
        </Link>
        <Link style={{ color: "white" }} to={"/gameroom"}>
          게임방{" "}
        </Link>
        <Link style={{ color: "white" }} to={"/reserve"}>
          예약{" "}
        </Link>
        <Link style={{ color: "white" }} to={"/profile"}>
          프로필페이지
        </Link>
        <Link style={{ color: "white" }} to={"/reserve/find"}>
          매칭
        </Link>
      </AppBar>
    </Box>
  );
};

export default Navbar;
