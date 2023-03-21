import React, { useEffect, useState } from "react";

import { Avatar, List, Skeleton } from "antd";
import { Link } from "react-router-dom";

const fakeDataUrl = `https://randomuser.me/api/?results=50&inc=name,gender,email,nat,picture&noinfo`;

const FollowerList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

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
  );
};

export default FollowerList;
