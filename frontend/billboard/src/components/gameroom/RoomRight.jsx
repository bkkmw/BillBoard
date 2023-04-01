import React, { useEffect } from "react";
import { useRef } from "react";
import GameroomSearch from "./GameroomSearch";
import { useState } from "react";
import { Button, Modal } from 'antd';
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
  const [gameDetail, setGameDetail] = useState()

  const inputRef = useRef()

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
        }}
      >
        게임 시작
      </Button>
    </div>

  );
};

export default RoomRight;
