import React, { useEffect, useState } from "react";

import { Input, Space, Avatar, List, Skeleton } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

const fakeDataUrl = `https://randomuser.me/api/?results=50&inc=name,gender,email,nat,picture&noinfo`;

const UserSearch = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const onSearch = (value) => console.log(value);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </Space>

      <List
        className="demo-loadmore-list"
        dataSource={list}
        itemLayout="horizontal"
        loading={initLoading}
        renderItem={(item) => (
          <List.Item actions={[<a key="list-loadmore-edit">delete</a>]}>
            <Skeleton active avatar loading={item.loading} title={false}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<Link to="/">{item.name?.last}</Link>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};
export default UserSearch;
