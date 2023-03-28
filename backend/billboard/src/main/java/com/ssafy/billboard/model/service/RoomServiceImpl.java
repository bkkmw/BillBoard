package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Entry;
import com.ssafy.billboard.model.entity.Reply;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.repository.EntryRepository;
import com.ssafy.billboard.model.repository.ReplyRepository;
import com.ssafy.billboard.model.repository.RoomRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReplyRepository replyRepository;
    private final EntryRepository entryRepository;

    @Override
    public RoomDto.RoomInfo createRoom(RoomDto.RoomInput roomInput){
        //없는 유저가 방장 > null
        if(!userRepository.existsByUserId(roomInput.getHostId()))
            return null;
        Room room = roomRepository.save(Room.builder()
                .hostId(roomInput.getHostId())
                .title(roomInput.getTitle())
                .personLimit(roomInput.getPersonLimit())
                .location(roomInput.getLocation())
                .lat(roomInput.getLat())
                .lng(roomInput.getLng())
                .date(roomInput.getDate())
                .build());
        //방장은 자동 참여 처리
        createEntry(room.getRoomId(), room.getHostId());
        return RoomDto.RoomInfo.builder()
                .roomId(room.getRoomId())
                .hostId(room.getHostId())
                .title(room.getTitle())
                .personCount(room.getEntries().size())
                .personLimit(room.getPersonLimit())
                .location(room.getLocation())
                .lat(room.getLat())
                .lng(room.getLng())
                .date(room.getDate())
                .build();
    }

    @Override
    public List<RoomDto.RoomInfo> getRooms(){
        List<Room> roomsEntity = roomRepository.findAll();
        List<RoomDto.RoomInfo> rooms = new ArrayList<>();
        for(Room room : roomsEntity)
            rooms.add(RoomDto.RoomInfo.builder()
                    .roomId(room.getRoomId())
                    .hostId(room.getHostId())
                    .title(room.getTitle())
                    .personCount(room.getEntries().size())
                    .personLimit(room.getPersonLimit())
                    .location(room.getLocation())
                    .lat(room.getLat())
                    .lng(room.getLng())
                    .date(room.getDate())
                    .build());
        return rooms;
    }

    @Override
    public RoomDto.RoomDetailInfo getRoom(long roomId){
        if(roomRepository.existsById(roomId)) {
            Room room = roomRepository.findById(roomId).get();
            return RoomDto.RoomDetailInfo.builder()
                    .roomInfo(RoomDto.RoomInfo.builder()
                            .roomId(room.getRoomId())
                            .hostId(room.getHostId())
                            .title(room.getTitle())
                            .personCount(room.getEntries().size())
                            .personLimit(room.getPersonLimit())
                            .location(room.getLocation())
                            .lat(room.getLat())
                            .lng(room.getLng())
                            .date(room.getDate())
                            .build())
                    .entries(room.getEntries())
                    .replies(getReplies(roomId))
                    .build();
        }
        //없는 방아이디 > null
        return null;
    }

    @Override
    public boolean deleteRoom(long roomId){
        //없는 방 아이디 > false
        if(!roomRepository.existsById(roomId))
            return false;
        roomRepository.deleteById(roomId);
        return true;
    }

    @Override
    public boolean updateRoom(long roomId, RoomDto.RoomUpdate roomUpdate){
        //없는 방 아이디 > false
        if(!roomRepository.existsById(roomId))
            return false;
        Room room = roomRepository.findById(roomId).get();
        room.updateRoom(roomUpdate);
        roomRepository.save(room);
        return true;
    }

    @Override
    public boolean createReply(long roomId, RoomDto.ReplyInput replyInput){
        //없는 방 or 유저 > false;
        if(!roomRepository.existsById(roomId) || !userRepository.existsByUserId(replyInput.getUserId()))
            return false;
        replyRepository.save(Reply.builder()
                .roomId(roomId)
                .content(replyInput.getContent())
                .userId(replyInput.getUserId())
                .build());
        return true;
    }

    @Override
    public List<RoomDto.ReplyInfo> getReplies(long roomId){
        //없는 방 아이디 > null
        if(!roomRepository.existsById(roomId))
            return null;
        List<Reply> repliesEntity = replyRepository.findAllByRoomId(roomId);
        List<RoomDto.ReplyInfo> replies = new ArrayList<>();
        for(Reply reply : repliesEntity)
            replies.add(RoomDto.ReplyInfo.builder()
                    .replyId(reply.getReplyId())
                    .content(reply.getContent())
                    .userId(reply.getUserId())
                    .createdTime(reply.getCreatedTime())
                    .build());
        return replies;
    }

    @Override
    public boolean deleteReply(long replyId){
        //없는 댓글 아이디 > false
        if(!replyRepository.existsById(replyId))
            return false;
        replyRepository.deleteById(replyId);
        return true;
    }

    @Override
    public int createEntry(long roomId, String userId){
        //없는 방 or 없는 유저 > 0
        if(!roomRepository.existsById(roomId) || !userRepository.existsByUserId(userId))
            return 0;
        //해당 방에 해당 유저가 이미 참여중 > -1
        if(entryRepository.existsByRoomAndUserId(roomRepository.findById(roomId).get(), userId))
            return -1;
        Room room = roomRepository.findById(roomId).get();
        entryRepository.save(Entry.builder()
                .room(room)
                .userId(userId)
                .build());
        return 1;
    }

    @Override
    public int deleteEntry(long roomId, String userId){
        //없는 방 or 유저 or 참여중이 아님 : 0
        if(!roomRepository.existsById(roomId)
                || !userRepository.existsByUserId(userId)
                || !entryRepository.existsByRoomAndUserId(roomRepository.findById(roomId).get(), userId))
            return 0;
        //방장이 참여 취소 : -1
        if(roomRepository.findById(roomId).get().getHostId().equals(userId))
            return -1;
        entryRepository.deleteByRoomAndUserId(roomRepository.findById(roomId).get(), userId);
        return 1;
    }

    @Override
    public List<RoomDto.RoomReservationInfo> getRoomsByUserId(String userId){
        //없는 유저 > null
        if(!userRepository.existsByUserId(userId))
            return null;
        List<Entry> entries = entryRepository.findAllByUserId(userId);
        List<RoomDto.RoomReservationInfo> rooms = new ArrayList<>();
        for(Entry entry : entries){
            Room room = entry.getRoom();
            rooms.add(RoomDto.RoomReservationInfo.builder()
                    .roomInfo(RoomDto.RoomInfo.builder()
                            .roomId(room.getRoomId())
                            .hostId(room.getHostId())
                            .title(room.getTitle())
                            .personCount(room.getEntries().size())
                            .personLimit(room.getPersonLimit())
                            .location(room.getLocation())
                            .lat(room.getLat())
                            .lng(room.getLng())
                            .date(room.getDate())
                            .build())
                    .entries(room.getEntries())
                    .build());
        }
        return rooms;
    }
}
