import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const RoomEntry = ({ isModalOpen, handleCancel, rooms, addUser }) => {
  useEffect(() => {
    // console.log(rooms)
  }, [rooms]);
  const submitPlayer = (entries) => {
    for (const entry of entries) {
      const userInfo = {
        email: entry.user.email,
        experience: entry.user.experience,
        matchCount: entry.user.matchCount,
        nickname: entry.user.nickname,
        userId: entry.user.userId,
        winCount: entry.user.winCount,
      };
      addUser(userInfo);
    }
    handleCancel();
  };
  return (
    <div>
      <>
        <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
          {rooms && (
            <>
              <Collapse accordion>
                {rooms.map((room, idx) => (
                  <Panel
                    header={`방이름:${room.roomInfo.title}`}
                    key={room + idx}
                  >
                    {room.entries.map((entry, i) => (
                      <>
                        <div key={entry + i}>id:{entry.user.userId}</div>
                      </>
                    ))}
                    <Button
                      onClick={() => {
                        submitPlayer(room.entries);
                      }}
                    >
                      예약선택
                    </Button>
                  </Panel>
                ))}
              </Collapse>
            </>
          )}
        </Modal>
      </>
    </div>
  );
};

export default RoomEntry;
