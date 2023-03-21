import React, { useState } from "react";

import { Button, Modal } from "antd";

import FollowingList from "./FollowingList";

const ProfileFollowing = () => {
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
      <Button type="primary" onClick={showModal}>
        팔로잉
      </Button>
      <Modal
        bodyStyle={{ maxHeight: "500px", overflowY: "scroll" }} // 스크롤 추가
        open={isModalOpen}
        title="팔로잉"
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div>
          <FollowingList />
        </div>
      </Modal>
    </>
  );
};

export default ProfileFollowing;
