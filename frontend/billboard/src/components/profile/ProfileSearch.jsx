import React, { useState } from "react";
import { Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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
      <Button type="primary" onClick={showModal} icon={<SearchOutlined />} />
      <Modal
        title="친구목록"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ maxHeight: "500px", overflowY: "scroll" }}
      >
        <div>
          <FriendList />
        </div>
      </Modal>
    </>
  );
};

export default ProfileSearch;
