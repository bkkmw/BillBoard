import style from "./GameReview.module.css";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { Table } from "antd";
import "./GamePagination.css";
import {
  getReviews,
  deleteReviews,
  createReviews,
} from "../../store/boardgames";
import { useDispatch, useSelector } from "react-redux";

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "30vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GameReview = (props) => {
  const [totalPages, setTotalPages] = useState(200);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.user);

  // 리뷰 등록 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 리뷰 삭제
  const handleDelete = (data) => {
    // console.log("dalkjf", data);
    dispatch(deleteReviews(data)).then((res) => {
      console.log("gkdl", res);
    });
  };

  // 리뷰 등록
  // const reviewPost = (e) => {
  //   console.log(e.target.rating.value);
  //   const data = {
  //     gameId: props.details.gameId,
  //     userId: loginUser.userId,
  //     name: props.details.name,
  //     rating: e.target.rating.value,
  //     comment: e.target.comment.value,
  //   };
  //   dispatch(createReviews(data)).then((res) => {
  //     window.location.reload();
  //   });
  // };
  const reviewPost = (e) => {
    e.preventDefault();
    const newReview = {
      gameId: props.details.gameId,
      userId: loginUser.userId,
      name: props.details.name,
      rating: e.target.rating.value,
      comment: e.target.comment.value,
    };
    const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const updatedReviews = [...existingReviews, newReview];
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    dispatch(createReviews(newReview)).then((res) => {
      window.location.reload();
    });
  };
  const columns = [
    {
      key: "userId",
      title: "아이디",
      dataIndex: "userId",
    },
    {
      key: "rating",
      title: "평점",
      dataIndex: "rating",
    },
    {
      key: "review",
      title: "리뷰",
      dataIndex: "comment",
    },
    {
      key: "delete",
      title: "Delete",
      render: (index, record) => (
        <Button onClick={() => handleDelete(record)}>Delete</Button>
      ),
    },
  ];

  return (
    <div>
      <span className={style.font}>리뷰</span>
      <Button onClick={handleOpen}>리뷰 등록</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            리뷰 등록
          </Typography>
          <Box
            onSubmit={(e) => {
              e.preventDefault();
              reviewPost(e);
              handleClose();
            }}
            component="form"
            sx={{}}
          >
            <TextField
              id="rating"
              // onChange={handleRating}
              variant="outlined"
              fullWidth
              type="number"
              label="별점(0~10점)"
            />
            <hr />
            <TextField
              id="comment"
              // onChange={handleReview}
              variant="outlined"
              fullWidth
              label="리뷰"
            />
            <hr />
            <Button type="submit">제출</Button>
          </Box>
        </Box>
      </Modal>

      <div
        className="fontSize"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table
          className="my-table"
          loading={loading}
          columns={columns}
          dataSource={props.reviews}
          style={{ width: "70vw" }}
          pagination={{
            pageSize: 10,
            total: totalPages,
            showSizeChanger: false,
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1rem",
            },
          }}
          rowKey={(record) => record.userId}
        ></Table>
      </div>
    </div>
  );
};

export default GameReview;
