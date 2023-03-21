package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room createRoom(RoomDto.RoomInput roomInput){
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
//        List<RoomDto.RoomInfo> rooms = new ArrayList<>();
        List<Room> rooms = roomRepository.findAll();
        return rooms;
    }

    public Room getRoom(int roomId){
        if(roomRepository.existsById(roomId))
            return roomRepository.findById(roomId).get();
        return null;
    }

    public boolean deleteRoom(int roomId){
        if(!roomRepository.existsById(roomId))
            return false;
        roomRepository.deleteById(roomId);
        return true;
    }

    public Room updateRoom(int roomId, RoomDto.RoomUpdate roomUpdate){
        if(!roomRepository.existsById(roomId))
            return null;
        Room room = roomRepository.findById(roomId).get();
        room.update(roomUpdate);
        roomRepository.save(room);
        return room;
    }
}
