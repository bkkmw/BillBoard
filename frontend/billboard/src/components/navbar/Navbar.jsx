import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";

import { useSelector } from "react-redux";
import httpClient from "../../utils/axios";
import { AppBar, Box } from "@mui/material";

// 네브바 최상단에 고정해서 스크롤 내려도 최상단으로 할것

// import { Button } from "@mui/material";
import { Button } from "antd";

import { persistor } from "../../store/store";
import { display } from "@mui/system";
import { selectUser } from "../../store/user";
import UserId from "../login/UserId";

const Navbar = () => {
  const userID = useSelector(selectUser).loginUser.userId;
  const navigate = useNavigate();
  // 로그인상태면 로그아웃 버튼이 로그아웃상태면 로그인, 회원가입 버튼
  const { login, loginUser } = useSelector((state) => state.user);
  // 로그아웃 api
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  const doLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        const response = await httpClient.post(
          `/users/logout/${loginUser.userId}`
        );
        // console.log("로그아웃", login);
      } catch (e) {
        console.log(e);
      }
      await sleep(1000);
      persistor.purge();
    }
    navigate("/login");
  };

  if (login === true) {
    return (
      <Box position="static">
        <AppBar style={{ height: "10vh", backgroundColor: "white" }}>
          <div className={style.background}>
            <Link to={"/main"} className={style.link}>
              <span className={style.logo}>BillBoard</span>
            </Link>
            <div>
              {!login && (
                <Link to={"/login"} className={style.link}>
                  로그인{" "}
                </Link>
              )}
              {!login && (
                <Link to={"/singup"} className={style.link}>
                  회원가입{" "}
                </Link>
              )}

              {login && (
                <Link to={"/main"} className={style.link}>
                  추천 보드게임
                </Link>
              )}
              {/* {login && (
                <Link
                  to={"/gameroom"}
                  className={`${style.link} ${style.blur}`}
                >
                  게임하기{" "}
                </Link>
              )} */}

              {login && (
                <Link to={"/reserve"} className={style.link}>
                  모임 예약
                </Link>
              )}
              {login && (
                <Link to={`/profile/${userID}`} className={style.link}>
                  프로필
                </Link>
              )}
              {login && (
                <Link onClick={doLogout} className={style.link2}>
                  로그아웃
                </Link>
              )}
            </div>
          </div>
        </AppBar>
      </Box>
    );
  }
};

export default Navbar;
