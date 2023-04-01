import React, { useEffect } from "react";
import { useRef } from "react";
import GameroomSearch from "./GameroomSearch";
import { useState } from "react";
import { Button, Modal } from 'antd';
import Detail from "../detail/DetailPage";
import { useDispatch, useSelector } from "react-redux";
import { selectgameroom, setIsInGame } from "../../store/gameroom";
import InGame from "./InGame";
import GameResult from "./GameResult";

const RoomRight = () => {
  const gameInfo = useSelector(selectgameroom).gameInfo
  const dispatch = useDispatch()
  const [openGameResult, setOpenGameResult] = useState(false);
  const isInGame = useSelector(selectgameroom).isInGame
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [gameDetail, setGameDetail] = useState()

  const inputRef = useRef()
  return (<>
    {!isInGame ?
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          width: "50vw",
        }}
      >
        <GameroomSearch setGameDetail={setGameDetail} showModal={showModal} />
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          bodyStyle={{ overflowY: 'auto', maxHeight: `${window.innerHeight * 0.8}` }}
          width={window.innerWidth * 0.8}>
          <Detail gameDetail={gameDetail} />
        </Modal>
        <Button
          style={{
            fontSize: "1.5rem",
            width: "8vw",
            height: "6vh",
            marginLeft: "17vw",
          }} onClick={() => {
            dispatch(setIsInGame(true))
          }}
          disabled={gameInfo.gameId ? false : true}
        >
          게임 시작
        </Button>
        <GameResult
          isModalOpen={openGameResult} setIsModalOpen={setOpenGameResult}
        />
      </div> : <InGame setOpenGameResult={setOpenGameResult} />}

  </>

    // * 밑에 있는게 게임중 보이는 화면 *


  );
};

export default RoomRight;
