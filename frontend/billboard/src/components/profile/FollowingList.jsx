import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { iFollowYou, YouFollowMe } from "../../store/profile";

import { Avatar, List, Skeleton } from "antd";
import { Link } from "react-router-dom";

const FollowingList = () => {
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.user);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);

  //팔로잉 목록 조회
  useEffect(() => {
    const userId = loginUser.userId;
    dispatch(iFollowYou(userId)).then((res) => {
      // console.log("시발ㄹㄹㄹ", res.payload);
      setInitLoading(false);
      setList(res.payload.followings);
    });
  }, []);

  return (
    <List
      className="demo-loadmore-list"
      dataSource={list}
      itemLayout="horizontal"
      loading={initLoading}
      renderItem={(item) => (
        <List.Item>
          <Skeleton active loading={item.loading} title={false}>
            <List.Item.Meta
              title={<Link to={`/profile/${item}`}>{item}</Link>}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default FollowingList;
