import React, { useEffect } from "react";
import { useRef } from "react";
import GameroomSearch from "./GameroomSearch";
import { useState } from "react";
import { Button, Modal } from "antd";
import Detail from "../detail/DetailPage";
import { useDispatch, useSelector } from "react-redux";
import { selectgameroom, setIsInGame } from "../../store/gameroom";
import Stopwatch from "./Stopwatch";
import Animation4 from "../lottie/Animation4";

const InGame = ({ setOpenGameResult }) => {
  const dispatch = useDispatch();
  const isInGame = useSelector(selectgameroom).isInGame;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "43vw",
        marginTop: "1.5rem",
        marginRight: "1.5rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#f9f9f9",
          height: "56vh",
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            width: "43vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* <span style={{ fontSize: "3vw" }}>16:40</span>
                        <span style={{ fontSize: "3vw" }}>타이머</span> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stopwatch />
          <Animation4 />
          <Button
            style={{
              width: "10vw",
              height: "5vh",
              fontSize: "2rem",
              marginLeft: "17vw",
              marginTop: "0.5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              dispatch(setIsInGame(false));
              setOpenGameResult(true);
            }}
          >
            게임 종료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InGame;
