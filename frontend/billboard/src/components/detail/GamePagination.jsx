import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";

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
      render: (_, record) => (
        <Button onClick={() => handleDelete(record)}>Delete</Button>
      ),
    },
  ];

  const fetchRecords = (page) => {
    setLoading(true);
    axios
      .get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
      .then((res) => {
        setDataSource(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
          total: totalPages,
          onChange: (page) => {
            fetchRecords(page);
          },
          showSizeChanger: false,
        }}
      ></Table>
    </div>
  );
};

export default GamePagination;
