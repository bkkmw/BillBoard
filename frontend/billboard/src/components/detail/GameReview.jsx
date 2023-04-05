import style from "./GameReview.module.css";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Review from "../gameroom/Review";
import { Table } from "antd";
import "./GamePagination.css";
import {
  getReviews,
  deleteReviews,
  createReviews,
} from "../../store/boardgames";
import { useDispatch, useSelector } from "react-redux";
import { useRouteLoaderData } from "react-router";

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

  const [deleteData, setDeleteData] = useState([]);
  const gameId = useRouteLoaderData("detail");
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // 리뷰 등록 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setDeleteData({
      userId: loginUser.userId,
      gameId: gameId,
    });
  }, []);

  // 리뷰 삭제
  const handleDelete = () => {
    const data = deleteData;
    console.log(data);
    dispatch(deleteReviews(data)).then(() => {
      window.location.reload();
    });
  };

  // 리뷰 등록
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
    dispatch(
      createReviews(newReview).then(() => {
        window.location.reload();
      })
    );
    // handleClose();
    // window.location.reload();
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
      style: {
        wordBreak: "keep-all",
      },
    },
    {
      key: "delete",
      render: (index, record) => {
        if (loginUser.userId === record.userId) {
          return (
            <>
              <Button onClick={() => handleDelete()}>삭제</Button>
            </>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Grid display="flex">
        <Typography fontSize="3rem" align="left" className={style.font}>
          리뷰
        </Typography>
        <Button
          size="large"
          type="primary"
          onClick={() => setIsReviewOpen(true)}
        >
          댓글달기
        </Button>
      </Grid>
      <Review
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
        userId={loginUser.userId}
        gameHistory={[{ ...props.details }]}
      />
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
          marginTop: "2rem",
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
              fontSize: "1.5rem",
              marginBottom: "3rem",
            },
          }}
          rowKey={(record) => record.userId}
        ></Table>
      </div>
    </div>
  );
};

export default GameReview;
