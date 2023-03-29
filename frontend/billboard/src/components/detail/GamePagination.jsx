import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import "./GamePagination.css";

const GamePagination = () => {
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
          },
        }}
        rowKey={(record) => record.key}
      ></Table>
    </div>
  );
};

export default GamePagination;
