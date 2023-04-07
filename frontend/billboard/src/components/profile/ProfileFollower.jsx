import React, { useState, useEffect } from "react";

import { Modal } from "antd";
import { Button } from "@mui/material";

import FollowerList from "./FollowerList";
import { useSelector } from "react-redux";
import { useRouteLoaderData } from "react-router";
import style from "./ProfileFollower.module.css";

const ProfileFollower = () => {
  const { loginUser } = useSelector((state) => state.user);
  const yourId = useRouteLoaderData("profile");

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
  useEffect(() => {
    if (loginUser.userId !== yourId) {
      setIsModalOpen(false);
    }
  }, [yourId]);
  return (
    <>
      <Button type="primary" onClick={showModal} className={style.btn}>
        팔로워
      </Button>
      <Modal
        footer={null}
        bodyStyle={{ maxHeight: "500px", overflowY: "scroll" }} // 스크롤 추가
        open={isModalOpen}
        title="팔로워"
        onCancel={handleCancel}
        onOk={handleOk}
        style={{ top: "20%" }}
      >
        <div>
          <FollowerList />
        </div>
      </Modal>
    </>
  );
};

export default ProfileFollower;
