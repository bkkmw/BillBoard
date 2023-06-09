import React, { useEffect } from "react";
import { useRef } from "react";
import GameroomSearch from "./GameroomSearch";
import { useState } from "react";
import { Button, Col, Drawer, Modal, Row, theme } from "antd";
import Detail from "../detail/DetailPage";
import { useDispatch, useSelector } from "react-redux";
import { selectgameroom, setIsInGame } from "../../store/gameroom";
import InGame from "./InGame";
import GameResult from "./GameResult";
import GameRecommend from "./GameRecommend";

export default function GameChoice() {
  const gameInfo = useSelector(selectgameroom).gameInfo
  const dispatch = useDispatch()
  const [openGameResult, setOpenGameResult] = useState(false);
  const isInGame = useSelector(selectgameroom).isInGame
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInRecommend, setIsInRecommend] = useState(false)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setpropGameId()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setpropGameId()
  };
  const [gameDetail, setGameDetail] = useState();
  const [propGameId, setpropGameId] = useState();
  const inputRef = useRef();
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      width: "50vw",
    }}
  >                
  {/* <Button
    type="primary"
    style={{
      fontSize: "1.5rem",
      width: "8vw",
      height: "6vh",
      display: "flex",
      justifyContent: "center",
    }}
    onClick={() => { setIsInRecommend(!isInRecommend) }}>
      {isInRecommend ? '검색하기' : '추천받기'}
    </Button> */}
    {isInRecommend ? <GameRecommend setpropGameId={setpropGameId} showModal={showModal} setIsInRecommend={setIsInRecommend} isInRecommend={isInRecommend}/> :
      <GameroomSearch setGameDetail={setGameDetail} showModal={showModal} setIsInRecommend={setIsInRecommend} isInRecommend={isInRecommend}/>}
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{
        overflowY: "auto",
        maxHeight: `${window.innerHeight * 0.8}`,
        
      }}
      width={window.innerWidth * 0.8}
    >
      <Detail gameDetail={gameDetail} propGameId={propGameId} />
    </Modal>
    {/* <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <img
        alt="보드게임"
        style={{
          fontSize: "1.5rem",
          width: "8vw",
          height: "6vh",
        }}
      ></img>
      <span
        style={{
          fontSize: "1.5rem",
          width: "8vw",
          height: "6vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        이름
      </span>

      </div> */}
      </div >
  );
}