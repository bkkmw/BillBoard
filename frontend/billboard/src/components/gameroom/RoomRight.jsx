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
import Animation from "../lottie/Animation2";
import GameChoice from "./GameChoice";


const RoomRight = ({showDrawer}) => {
  const gameInfo = useSelector(selectgameroom).gameInfo
  const dispatch = useDispatch()
  const [openGameResult, setOpenGameResult] = useState(false);
  const isInGame = useSelector(selectgameroom).isInGame
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInRecommend, setIsInRecommend] = useState(true)
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
  return (<>
  <Row>
    {!isInGame?
    <Row>
      <Col span={24}>
        {gameInfo.name?<h1> 게임을 플레이 하세요! </h1>:<h1>플레이할 게임을 선택해 주세요</h1>}
        
      </Col>
      <Col span={24}>
    <Animation/></Col></Row>:<InGame setOpenGameResult={setOpenGameResult} />}
  </Row>

  <Row>

  
{/* {!isInGame ?
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          width: "50vw",
        }}
      >                <Button
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
        </Button>
        {isInRecommend ? <GameRecommend setpropGameId={setpropGameId} showModal={showModal} /> :
          <GameroomSearch setGameDetail={setGameDetail} showModal={showModal} />}
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          bodyStyle={{
            overflowY: "auto",
            maxHeight: `${window.innerHeight * 0.8}`,
          }}
          width={window.innerWidth * 0.8}
        >
          <Detail gameDetail={gameDetail} propGameId={propGameId} />
        </Modal>
        <div
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
          <Button
            style={{
              fontSize: "1.5rem",
              width: "8vw",
              height: "6vh",
            }} onClick={() => {
              dispatch(setIsInGame(true))
            }}
            disabled={gameInfo.gameId ? false : true}
          >
            게임 시작
          </Button>

        </div>       </div > : <InGame setOpenGameResult={setOpenGameResult} />} */}
  </Row>
  {!isInGame&& <> <Button
        style={{
          fontSize: "1.5rem",
          width: "8vw",
          height: "6vh",
        }} onClick={() => {
          dispatch(setIsInGame(true))
        }}
        disabled={gameInfo.gameId ? false : true}
      >
        게임 시작
      </Button>
      <Button style={{
          fontSize: "1.5rem",
          width: "8vw",
          height: "6vh",
        }} onClick={showDrawer}>게임 찾기</Button>
          <GameResult
            isModalOpen={openGameResult} setIsModalOpen={setOpenGameResult}
          /></>}

    
        
  </>


    // * 밑에 있는게 게임중 보이는 화면 *


  );
};

export default RoomRight;
