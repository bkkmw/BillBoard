package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Entry;
import com.ssafy.billboard.model.entity.Reply;
import com.ssafy.billboard.model.entity.Room;

import java.util.List;

public interface RoomService {
    public boolean createRoom(RoomDto.RoomInput roomInput);
    public List<RoomDto.RoomInfo> getRooms();
    public RoomDto.RoomDetailInfo getRoom(long roomId);
    public boolean deleteRoom(long roomId);
    public boolean updateRoom(long roomId, RoomDto.RoomUpdate roomUpdate);
    public boolean createReply(RoomDto.ReplyInput replyInput);
    public List<RoomDto.ReplyInfo> getReplies(long roomId);
    public boolean deleteReply(long replyId);
    public int createEntry(RoomDto.EntryInput entryInput);
    public boolean deleteEntry(RoomDto.EntryInput entryInput);
}
