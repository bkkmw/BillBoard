import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import ReserveForm from "./ReserveForm";
import KakaoMapT from "./KakaoMapT";

const Reserve = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
      <Button onClick={()=>{
        setModalOpen(true)
      }}>예약하러 왔니?</Button>
      
      <Link to="/">메인페이지로</Link>
      <div id="modal">
      <Modal title="Basic Modal" open={modalOpen} onCancel={()=>{
        setModalOpen(false)
      }} width={window.innerWidth*0.8} bodyStyle={{height:window.innerHeight*0.8}}>
        <ReserveForm/>
      </Modal>
      </div>

      {/* <KakaoMapT></KakaoMapT> */}

    </div>
  );
};

export default Reserve;
