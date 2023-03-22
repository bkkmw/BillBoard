import React, { useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

import FriendList from "./FriendList";

const ProfileSearch = () => {
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
      <Button icon={<SearchOutlined />} type="primary" onClick={showModal} />
      <Modal
        bodyStyle={{ maxHeight: "500px", overflowY: "scroll" }}
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

export default ProfileSearch;
