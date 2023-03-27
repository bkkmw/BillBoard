import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

import { AppBar, Box } from "@mui/material";
// 네브바 최상단에 고정해서 스크롤 내려도 최상단으로 할것

const Navbar = () => {
  return (
    <Box position="static">
      <AppBar
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          height: "10vh",
        }}
      >
        <Link to={"/login"} className={style.link}>
          로그인{" "}
        </Link>
        <Link to={"/singup"} className={style.link}>
          회원가입{" "}
        </Link>
        <Link to={"/gameroom"} className={style.link}>
          게임방{" "}
        </Link>
        <Link to={"/reserve"} className={style.link}>
          예약{" "}
        </Link>
        <Link to={"/main"} className={style.link}>
          메인페이지
        </Link>
        <Link to={"/profile"} className={style.link}>
          프로필페이지
        </Link>
        <Link to={"/reserve/find"} className={style.link}>
          매칭
        </Link>
      </AppBar>
    </Box>
  );
};

export default Navbar;
