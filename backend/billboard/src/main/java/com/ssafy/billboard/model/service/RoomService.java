package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.RoomDto;

import java.util.List;

public interface RoomService {
    public RoomDto.RoomInfo createRoom(RoomDto.RoomInput roomInput);
    public List<RoomDto.RoomInfo> getRooms();
    public RoomDto.RoomDetailInfo getRoom(long roomId);
    public boolean deleteRoom(long roomId);
    public boolean updateRoom(long roomId, RoomDto.RoomUpdate roomUpdate);
    public boolean createReply(long roomId, RoomDto.ReplyInput replyInput);
    public List<RoomDto.ReplyInfo> getReplies(long roomId);
    public boolean deleteReply(long replyId);
    public int createEntry(long roomId, String userId);
    public boolean deleteEntry(long roomId, String userId);
    public List<RoomDto.RoomReservationInfo> getRoomsByUserId(String userId);
}
