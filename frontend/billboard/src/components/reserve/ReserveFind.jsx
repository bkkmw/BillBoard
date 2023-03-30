import React, { useEffect, useRef, useState } from "react";

import { Button, Col, List, Row } from "antd";
import ReserveFindAddress from "./ReserveFindAddress";
import { getRoom } from "../../store/reserve";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { display } from "@mui/system";

let dateList = [];
for (let i = 0; i < 7; i++) {
  const today = new Date();
  today.setDate(today.getDate() + i);
  dateList.push(today.toLocaleDateString());
}

const ReserveFind = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isChildAddressOpen, setIsChildAddressOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [rooms, setRooms] = useState();
  const [filterRooms, setFilterRooms] = useState();
  const [coordinate, setCoordinate] = useState();
  const [sortedRooms, setSortedRooms] = useState();
  // Todo: rejected
  useEffect(() => {
    dispatch(getRoom())
      .then((data) => {
        setRooms((rooms) => data.payload.rooms);
        getFilter();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // 날짜, 방정보가 갱신될때마다 보일 방 목록 필터링
  useEffect(() => {
    getFilter();
  }, [date, rooms]);
  // 방목록이 필터링된 후, 지역정보가 바뀔때마다 거리순으로 정렬렬
  useEffect(() => {
    sortRoom();
  }, [filterRooms, coordinate]);
  const sortRoom = () => {
    if (coordinate && filterRooms) {
      const newFilter = filterRooms.sort(function (a, b) {
        const xy_a = [a.lng, a.lat]
        const xy_b = [b.lng, b.lat]

        // console.log(getDistance(xy_a), getDistance(xy_b))
        if (getDistance(xy_a) > getDistance(xy_b)) {
          return 1;
        } else {
          return -1;
        }
      });

      setSortedRooms([...newFilter]);
    } else {
      setSortedRooms(filterRooms);
    }
  };
  async function getFilter() {
    if (rooms) {
      let filter = [];
      for (const room of rooms) {
        
        if (
          
          new Date(room.date).toLocaleDateString() === date.toLocaleDateString()
        ) {console.log(room.date, date)
          console.log(new Date(room.date).toLocaleDateString(),date.toLocaleDateString())
          console.log(new Date(room.date))
          filter.push(room);
        }
      }
      setFilterRooms((filterRooms) => filter);
    }
  }
  const getDistance = (arr) => {
    return (arr[0] - coordinate.x) ** 2 + (arr[1] - coordinate.y) ** 2;
  };

  return (
    <div style={{ width: "70vw", marginTop: "10vh" }}>
      <Row>
        <Col span={12}>
          <Row>
            <Button
              type="primary"
              onClick={() => {
                setIsAddressOpen(true);
              }}
              style={{
                width: "10vw",
                height: "7vh",
                borderRadius: "2rem",
                marginBottom: "1rem",
                fontSize: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {address === "" ? "지역별" : address}
            </Button>
          </Row>
          <Row>
            <List
              style={{
                borderTop: "1.5rem solid #d9d9d9",
                borderBottom: "2rem solid #d9d9d9",
                borderLeft: "1rem solid #d9d9d9",
                borderRight: "1rem solid #d9d9d9",
                borderRadius: "1.5rem",
              }}
              dataSource={dateList}
              renderItem={(item) => (
                <List.Item
                  style={{
                    fontSize: "2.5rem",
                    paddingRight: "2rem",
                    paddingLeft: "2rem",
                  }}
                  className={`list_item_hover ${
                    item === date.toLocaleDateString() && "list_item_select"
                  }`}
                  onClick={() => {
                    setDate(new Date(item));
                  }}
                >
                  {item}
                </List.Item>
              )}
            />
          </Row>
          <ReserveFindAddress
            Open={isAddressOpen}
            childrenDrawer={isChildAddressOpen}
            setAddress={setAddress}
            setChildrenDrawer={setIsChildAddressOpen}
            onClose={() => setIsAddressOpen(false)}
            setCoordinate={setCoordinate}
          />
        </Col>
        <Col span={12}>
          <List
            dataSource={sortedRooms}
            renderItem={(item) => (
              <List.Item
                className={`list_item_hover ${
                  item === date.toLocaleDateString() && "list_item_select"
                }`}
              >
                <Link to={`/room/${item.roomId}`}>{`날짜:${item.date},
      방장ID:${item.hostID},
      location:${item.location},
      personCount:${item.personCount},
      personLimit:${item.personLimit},
      roomId:${item.roomId},
      title:${item.title},
      lat:${item.lat},
      lng:${item.lng}
   `}</Link>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      {/* <div>x:{coordinate.x}, y:{coordinate.y}</div> */}
    </div>
  );
};

export default ReserveFind;
