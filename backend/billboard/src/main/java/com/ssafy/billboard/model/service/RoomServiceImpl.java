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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReplyRepository replyRepository;
    private final EntryRepository entryRepository;

    @Override
    public RoomDto.RoomInfo createRoom(RoomDto.RoomInput roomInput){
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
        return null;
    }

    @Override
    public boolean deleteRoom(long roomId){
        if(!roomRepository.existsById(roomId))
            return false;
        roomRepository.deleteById(roomId);
        return true;
    }

    @Override
    public boolean updateRoom(long roomId, RoomDto.RoomUpdate roomUpdate){
        if(!roomRepository.existsById(roomId))
            return false;
        Room room = roomRepository.findById(roomId).get();
        room.update(roomUpdate);
        roomRepository.save(room);
        return true;
    }

    @Override
    public boolean createReply(RoomDto.ReplyInput replyInput){
        if(!roomRepository.existsById(replyInput.getRoomId()) || !userRepository.existsByUserId(replyInput.getUserId()))
            return false;
        replyRepository.save(Reply.builder()
                .roomId(replyInput.getRoomId())
                .content(replyInput.getContent())
                .userId(replyInput.getUserId())
                .build());
        return true;
    }

    @Override
    public List<RoomDto.ReplyInfo> getReplies(long roomId){
        if(!roomRepository.existsById(roomId))
            return null;
        List<Reply> repliesEntity = replyRepository.findAllByRoomId(roomId);
        List<RoomDto.ReplyInfo> replies = new ArrayList<>();
        for(Reply reply : repliesEntity)
            replies.add(RoomDto.ReplyInfo.builder()
                    .content(reply.getContent())
                    .userId(reply.getUserId())
                    .createdTime(reply.getCreatedTime())
                    .build());
        return replies;
    }

    @Override
    public boolean deleteReply(long replyId){
        if(!replyRepository.existsById(replyId))
            return false;
        replyRepository.deleteById(replyId);
        return true;
    }

    @Override
    public int createEntry(RoomDto.EntryInput entryInput){
        if(!roomRepository.existsById(entryInput.getRoomId()) || !userRepository.existsByUserId(entryInput.getUserId()))
            return 0;
        if(entryRepository.existsByRoomAndUserId(roomRepository.findById(entryInput.getRoomId()).get(), entryInput.getUserId()))
            return -1;
        entryRepository.save(Entry.builder()
                .room(roomRepository.findById(entryInput.getRoomId()).get())
                .userId(entryInput.getUserId())
                .build());
        return 1;
    }

    @Override
    public boolean deleteEntry(RoomDto.EntryInput entryInput){
        if(!roomRepository.existsById(entryInput.getRoomId())
                || !userRepository.existsByUserId(entryInput.getUserId())
                || !entryRepository.existsByRoomAndUserId(roomRepository.findById(entryInput.getRoomId()).get(), entryInput.getUserId()))
            return false;
        entryRepository.deleteByRoomAndUserId(roomRepository.findById(entryInput.getRoomId()).get(), entryInput.getUserId());
        return true;
    }
}
