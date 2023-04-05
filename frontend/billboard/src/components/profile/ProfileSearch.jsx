import React, { useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

import UserSearch from "./UserSearch";

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
      <Button
        size="large"
        icon={<SearchOutlined />}
        type="primary"
        onClick={showModal}
      >
        친구찾기
      </Button>
      <Modal
        footer={null}
        bodyStyle={{ height: "50vh", overflowY: "scroll" }}
        open={isModalOpen}
        title="친구 찾기"
        onCancel={handleCancel}
        style={{ top: "20%" }}
      >
        <div>
          <UserSearch />
        </div>
      </Modal>
    </>
  );
};

export default ProfileSearch;
