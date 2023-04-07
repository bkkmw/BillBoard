import React, { useState, useEffect } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Button } from "@mui/material";

import UserSearch from "./UserSearch";
import { useSelector } from "react-redux";
import { useRouteLoaderData } from "react-router";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
const ProfileSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginUser } = useSelector((state) => state.user);
  const yourId = useRouteLoaderData("profile");

  // 모달창 끄기
  useEffect(() => {
    if (loginUser.userId !== yourId) {
      setIsModalOpen(false);
    }
  }, [yourId]);
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
        style={{
          position: "fixed",
          top: "17rem",
          right: "20rem",
          backgroundColor: "transparent",
          width: "7rem",
          height: "2.5rem",
        }}
        onClick={showModal}
      >
        <PersonAddIcon
          sx={{
            color: "black",
            fontSize: "70px",
          }}
        />
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
