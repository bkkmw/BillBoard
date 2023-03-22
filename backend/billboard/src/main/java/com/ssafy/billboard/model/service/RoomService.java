package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Entry;
import com.ssafy.billboard.model.entity.Reply;
import com.ssafy.billboard.model.entity.Room;

import java.util.List;

public interface RoomService {
    public Room createRoom(RoomDto.RoomInput roomInput);
    public List<Room> getRooms();
    public Room getRoom(long roomId);
    public boolean deleteRoom(long roomId);
    public Room updateRoom(long roomId, RoomDto.RoomUpdate roomUpdate);
    public Reply createReply(RoomDto.ReplyInput replyInput);
    public List<Reply> getReplies(long roomId);
    public boolean deleteReply(long replyId);
    public Entry createEntry(RoomDto.EntryInput entryInput);
    public boolean deleteEntry(RoomDto.EntryInput entryInput);
}
