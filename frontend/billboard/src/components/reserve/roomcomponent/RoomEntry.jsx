import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEntry, makeEntry } from "../../../store/reserve";

const RoomEntry = ({ entries, roomId, reload }) => {
  // Todo: userId를 로그인정보에서 들고오기기
  const userId = "string";
  const [isInEntry, setIsInEntry] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    for (const entry of entries) {
      if (entry.userId === userId) {
        setIsInEntry(true);
      }
    }
  }, []);
  const clickEvent = () => {
    const data = { roomId: roomId, userId: userId };
    if (isInEntry === false) {
      dispatch(makeEntry(data)).then((res) => {
        console.log(res);
        setIsInEntry(true);
        reload();
      });
    } else {
      dispatch(deleteEntry(data)).then((res) => {
        console.log(res);
        setIsInEntry(false);
        reload();
      });
    }
  };
  return (
    <div>
      <div style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
        {entries.map((entry, i) => {
          return (
            <>
              {/* <div>유저명: {entry.userId}</div> */}
              <div key={entry + i}>{entry.userId}</div>
            </>
          );
        })}
      </div>
      <Button
        onClick={() => {
          clickEvent();
        }}
      >
        {isInEntry === true ? "등록해제" : "등록"}
      </Button>
    </div>
  );
};

export default RoomEntry;
