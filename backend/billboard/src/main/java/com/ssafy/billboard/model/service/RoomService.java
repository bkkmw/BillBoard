package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Reply;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.repository.ReplyRepository;
import com.ssafy.billboard.model.repository.RoomRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private UserRepository userRepository;

    public Room createRoom(RoomDto.RoomInput roomInput){
        //없는 유저 처리
        Room room = Room.builder()
                .hostId(roomInput.getHostId())
                .title(roomInput.getTitle())
                .personCount(0)
                .personLimit(roomInput.getPersonLimit())
                .location(roomInput.getLocation())
                .date(roomInput.getDate())
                .build();
        return roomRepository.save(room);
    }

    public List<Room> getRooms(){
        List<Room> rooms = roomRepository.findAll();
        return rooms;
    }

    public Room getRoom(long roomId){
        if(roomRepository.existsById(roomId))
            return roomRepository.findById(roomId).get();
        return null;
    }

    public boolean deleteRoom(long roomId){
        if(!roomRepository.existsById(roomId))
            return false;
        roomRepository.deleteById(roomId);
        return true;
    }

    public Room updateRoom(long roomId, RoomDto.RoomUpdate roomUpdate){
        if(!roomRepository.existsById(roomId))
            return null;
        Room room = roomRepository.findById(roomId).get();
        room.update(roomUpdate);
        roomRepository.save(room);
        return room;
    }

    public Reply createReply(RoomDto.ReplyInput replyInput){
        if(!roomRepository.existsById(replyInput.getRoomId()))//없는 유저 처리 아직 안 함
            return null;
        Reply reply = Reply.builder()
                .roomId(replyInput.getRoomId())
                .content(replyInput.getContent())
                .userId(replyInput.getUserId())
                .build();
        return replyRepository.save(reply);
    }

    public List<Reply> getReplies(long roomId){
        if(!roomRepository.existsById(roomId))
            return null;
        return replyRepository.findAllByRoomId(roomId);
    }

    public boolean deleteReply(long replyId){
        if(!replyRepository.existsById(replyId))
            return false;
        replyRepository.deleteById(replyId);
        return true;
    }
}
