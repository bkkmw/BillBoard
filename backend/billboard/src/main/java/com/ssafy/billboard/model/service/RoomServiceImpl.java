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
        room.updateRoom(roomUpdate);
        roomRepository.save(room);
        return true;
    }

    @Override
    public boolean createReply(long roomId, RoomDto.ReplyInput replyInput){
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
        if(!replyRepository.existsById(replyId))
            return false;
        replyRepository.deleteById(replyId);
        return true;
    }

    @Override
    public int createEntry(long roomId, String userId){
        if(!roomRepository.existsById(roomId) || !userRepository.existsByUserId(userId))
            return 0;
        if(entryRepository.existsByRoomAndUserId(roomRepository.findById(roomId).get(), userId))
            return -1;
        entryRepository.save(Entry.builder()
                .room(roomRepository.findById(roomId).get())
                .userId(userId)
                .build());
        return 1;
    }

    @Override
    public boolean deleteEntry(long roomId, String userId){
        if(!roomRepository.existsById(roomId)
                || !userRepository.existsByUserId(userId)
                || !entryRepository.existsByRoomAndUserId(roomRepository.findById(roomId).get(), userId))
            return false;
        entryRepository.deleteByRoomAndUserId(roomRepository.findById(roomId).get(), userId);
        return true;
    }

    @Override
    public List<RoomDto.RoomReservationInfo> getRoomsByUserId(String userId){
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
