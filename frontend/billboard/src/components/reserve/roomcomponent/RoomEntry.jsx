import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntry, makeEntry } from "../../../store/reserve";
import { selectUser } from "../../../store/user";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
const RoomEntry = ({ entries, roomId, reload, hostId }) => {
  // Todo: userId를 로그인정보에서 들고오기기
  const userId = useSelector(selectUser).loginUser.userId;
  const [isInEntry, setIsInEntry] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(entries)
    for (const entry of entries) {
      if (entry.user.userId === userId) {
        setIsInEntry(true);
      }
    }
    console.log(entries)
  }, []);
  const clickEvent = () => {
    const data = { roomId: roomId, userId: userId };
    if (isInEntry === false) {
      dispatch(makeEntry(data)).then((res) => {
        // console.log(res);
        setIsInEntry(true);
        reload();
      });
    } else {
      dispatch(deleteEntry(data)).then((res) => {
        // console.log(res);
        setIsInEntry(false);
        reload();
      });
    }
  };
  return (
    <div>
      <div style={{ fontSize: "1.5rem", fontWeight: "bolder", width:"40vw", display:"flex", justifyContent:"start", alignItems:"start"}}>
      <Stack direction="row" spacing={1}>
        {entries.map((entry, i) => {
          return (
            <>
                    <Chip
        avatar={<Avatar alt="avatar" src={`https://avatars.dicebear.com/api/identicon/${entry.user.userId}.svg`} />}
        label={entry.user.userId}
        variant="outlined"
        key={entry + i}
      />
            </>
          );
        })}
            </Stack>
      </div>
      {userId !== hostId && (
        <Button
          onClick={() => {
            clickEvent();
          }}
        >
          {isInEntry === true ? "등록해제" : "등록"}
        </Button>
      )}
    </div>
  );
};

export default RoomEntry;

