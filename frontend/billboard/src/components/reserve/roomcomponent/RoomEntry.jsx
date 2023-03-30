import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntry, makeEntry } from "../../../store/reserve";
import { selectUser } from "../../../store/user";

const RoomEntry = ({ entries, roomId, reload,hostId }) => {
  // Todo: userId를 로그인정보에서 들고오기기
  const userId = useSelector(selectUser).loginUser.userId
  const [isInEntry, setIsInEntry] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(entries)
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
        플레이어:
        {entries.map((entry, i) => {
          return (
            <>
              {/* <div>유저명: {entry.userId}</div> */}
              <div key={entry + i}>{entry.userId}</div>
            </>
          );
        })}
      </div>
      {userId!==hostId&&
      <Button
        onClick={() => {
          clickEvent();
        }}
      >{isInEntry === true? "등록해제" : "등록"}
        
      </Button>}
    </div>
  );
};

export default RoomEntry;
