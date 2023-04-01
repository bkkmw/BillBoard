import style from "./GameReview.module.css";

import axios from "axios";
import React, { useState, useEffect } from "react";

import { Table, Button } from "antd";
import "./GamePagination.css";

const GameReview = (props) => {
  const [totalPages, setTotalPages] = useState(2000);
  const [loading, setLoading] = useState(false);

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
