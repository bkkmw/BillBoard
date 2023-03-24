import React, { useState } from "react";

import { Button, Modal } from "antd";

import DetailPage from "../detail/DetailPage";

const Det = () => {
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
        상세페이지
      </Button>
      <Modal
        bodyStyle={{ maxHeight: "700px", overflowY: "scroll" }} // 스크롤 추가
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        style={{ top: "15%" }}
        width={window.innerWidth * 0.8}
      >
        <div>
          <DetailPage />
        </div>
      </Modal>
    </>
  );
};

export default Det;
