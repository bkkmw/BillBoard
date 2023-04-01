import React, { useEffect } from "react";
import { useRef } from "react";
import GameroomSearch from "./GameroomSearch";
import { useState } from "react";
import { Button, Modal } from "antd";
import Detail from "../detail/DetailPage";

const RoomRight = () => {
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
  const [gameDetail, setGameDetail] = useState();

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
      <GameroomSearch setGameDetail={setGameDetail} showModal={showModal} />
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
        <Detail gameDetail={gameDetail} />
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
          }}
        >
          게임 시작
        </Button>
      </div>
    </div>

    // * 밑에 있는게 게임중 보이는 화면 *

    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "space-evenly",
    //     width: "43vw",
    //     marginRight: "1.5rem",
    //   }}
    // >
    //   <div
    //     style={{
    //       backgroundColor: "#f9f9f9",
    //       height: "55vh",
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-evenly",
    //     }}
    //   >
    //     <div
    //       style={{
    //         width: "43vw",
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "space-evenly",
    //       }}
    //     >
    //       <span style={{ fontSize: "3vw" }}>16:40</span>
    //       <span style={{ fontSize: "3vw" }}>타이머</span>
    //     </div>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //       }}
    //     >
    //       <img
    //         src="https://cataas.com/cat"
    //         alt="보드게임"
    //         style={{ width: "18vw", height: "30vh", marginLeft: "13vw" }}
    //       />
    //       <span style={{ fontSize: "2vw", marginTop: "3vh" }}>보드게임</span>
    //     </div>
    //   </div>
    //   <Button
    //     style={{
    //       width: "10vw",
    //       height: "5vh",
    //       fontSize: "2rem",
    //       marginLeft: "17vw",
    //     }}
    //   >
    //     게임 종료
    //   </Button>
    // </div>
  );
};

export default RoomRight;
