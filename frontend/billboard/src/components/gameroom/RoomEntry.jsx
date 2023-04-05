import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const RoomEntry = ({ isModalOpen, handleCancel, rooms, addEntry }) => {
  useEffect(() => {
    // console.log(rooms)
  }, [rooms]);
  const submitPlayer = (entries) => {
    addEntry(entries)
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
