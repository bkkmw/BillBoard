import { React, useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import Navbar from "./components/navbar/Navbar";
import httpClient from "./utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { updateToken, clearUserInfo } from "./store/user";
import { doLogOut } from "./utils/logOut";
import { Link } from "react-router-dom";

let tokenInterceptor;

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser, login } = useSelector((state) => state.user);

  useEffect(() => {
    if (login && location.pathname.endsWith("/")) {
      navigate("/main"); // login 값이 true이면 메인 페이지로 리다이렉트
    } else if (!login) {
      navigate("/login"); // login 값이 false이면 로그인 페이지로 리다이렉트
    }
  }, [login]);

  // 로그아웃시 내브바가 안사라지는 이슈
  function excludeHeader() {
    if (location.pathname.startsWith("/login")) return true;
    else return false;
  }
  // jwt 토큰
  useEffect(() => {
    // 인터셉터 제거
    if (tokenInterceptor != null) {
      httpClient.interceptors.response.eject(tokenInterceptor);
    }
    // 응답 인터셉터 추가
    tokenInterceptor = httpClient.interceptors.response.use(
      // 응답 데이터를 가공
      function (response) {
        if (response != undefined && response.status === 200) {
          return response;
        }
        return response;
      },
      // 오류응답 처리
      function (error) {
        const originalRequest = error.config;
        if (error.response != undefined && error.response.data === 401) {
          console.log("unauthorized!!");
          const userStore = JSON.parse(
            window.localStorage.getItem("persist:root")
          );
          const user = JSON.parse(userStore.user);
          const refreshToken = user.loginUser.refreshToken;
          if (refreshToken != undefined && refreshToken != "") {
            httpClient
              .post("/refresh", {
                headers: {
                  token: refreshToken,
                },
              })
              .then(async (res) => {
                console.log("refresh!!");
                if (res != null && res.data.msg === "success") {
                  dispatch(updateToken(res.data["new accessToken"]));
                  originalRequest.headers.Authorization = `Bearer ${res.data["new accessToken"]}`;
                  const finalResponse = await httpClient(originalRequest);
                  return finalResponse;
                } else {
                  console.log("fail refresh");
                  return Promise.reject(error);
                }
              })
              .catch(() => {
                console.log("refresh token expired do logout");
                dispatch(clearUserInfo());
                window.alert("세션이 만료되었습니다. 다시 로그인");
                doLogOut();
                navigate("/login");
              });
          } else {
            navigate("/login");
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
    if (!login) navigate("/login");
  }, []);

  useEffect(() => {
    // console.log("ACCESS TOKEN MODIFIED");
    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginUser.accessToken}`;
  }, [loginUser.accessToken]);

  return (
    <div>
      {!excludeHeader() && <Navbar />}

      <Outlet />
    </div>
  );
}

export default App;
