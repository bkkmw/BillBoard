import React, { useEffect, useState } from "react";
import { Avatar, List, Skeleton } from "antd";

const fakeDataUrl = `https://randomuser.me/api/?results=50&inc=name,gender,email,nat,picture&noinfo`;

const FriendList = () => {
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
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item actions={[<a key="list-loadmore-edit">edit</a>]}>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={item.name?.last}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default FriendList;
