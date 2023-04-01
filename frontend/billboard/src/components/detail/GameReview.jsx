import style from "./GameReview.module.css";

import axios from "axios";
import React, { useState, useEffect } from "react";

import { Table, Button } from "antd";
import "./GamePagination.css";

const GameReview = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchRecords(1);
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Trips",
      dataIndex: "trips",
    },
    {
      title: "Delete",
      render: (index, record) => (
        <Button onClick={() => handleDelete(record)}>Delete</Button>
      ),
    },
  ];

  const fetchRecords = (page) => {
    setLoading(true);
    axios
      .get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
      .then((res) => {
        const dataWithKeys = res.data.data.map((row) => ({
          ...row,
          key: row._id, // Use the _id field as the unique key
        }));
        setDataSource(dataWithKeys);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      });
  };

  return (
    <div>
      <span className={style.font}>리뷰</span>
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
          dataSource={dataSource}
          style={{ width: "70vw" }}
          pagination={{
            pageSize: 10,
            total: totalPages,
            onChange: (page) => {
              fetchRecords(page);
            },
            showSizeChanger: false,
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              marginBottom: "3rem",
            },
          }}
          rowKey={(record) => record.key}
        ></Table>
      </div>
    </div>
  );
};

export default GameReview;
