import React, { useEffect, useState } from "react";

import { Modal } from "antd";
import { Button } from "@mui/material";

import FollowingList from "./FollowingList";

import style from "./ProfileFollowing.module.css";

import { useSelector } from "react-redux";
import { useRouteLoaderData } from "react-router";

const ProfileFollowing = () => {
  const { loginUser } = useSelector((state) => state.user);
  const yourId = useRouteLoaderData("profile");

  useEffect(() => {
    if (loginUser.userId !== yourId) {
      setIsModalOpen(false);
    }
  }, [yourId]);
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
  return (
    <>
      <Button type="primary" onClick={showModal} className={style.btn}>
        팔로잉
      </Button>
      <Modal
        footer={null}
        bodyStyle={{ maxHeight: "500px", overflowY: "scroll" }} // 스크롤 추가
        open={isModalOpen}
        title="팔로잉"
        onCancel={handleCancel}
        onOk={handleOk}
        style={{ top: "20%" }}
      >
        <div>
          <FollowingList />
        </div>
      </Modal>
    </>
  );
};

export default ProfileFollowing;
