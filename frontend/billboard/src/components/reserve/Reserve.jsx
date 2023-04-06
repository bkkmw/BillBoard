import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Modal } from "antd";

import KakaoMapT from "./KakaoMapT";
import ReserveForm from "./ReserveForm";

const Reserve = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        예약하러 왔니?
      </Button>

      <Link to="/">메인페이지로</Link>
      <div id="modal">
        <Modal
          footer={null}
          bodyStyle={{ height: window.innerHeight * 0.8 }}
          open={modalOpen}
          title="지도"
          width={window.innerWidth * 0.8}
          onCancel={() => {
            setModalOpen(false);
          }}
        >
          <ReserveForm />
        </Modal>
      </div>

      {/* <KakaoMapT></KakaoMapT> */}
    </div>
  );
};

export default Reserve;
