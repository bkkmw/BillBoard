import React, { useState } from "react";

import { Button, Modal } from "antd";

import FriendList from "./FriendList";

const ProfileModal = () => {
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
        친구목록
      </Button>
      <Modal
        bodyStyle={{ maxHeight: "500px", overflowY: "scroll" }} // 스크롤 추가
        open={isModalOpen}
        title="친구목록"
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div>
          <FriendList />
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
