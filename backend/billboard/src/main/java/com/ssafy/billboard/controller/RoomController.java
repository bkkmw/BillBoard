package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/room")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @PostMapping()
    public ResponseEntity<?> createRoom(@RequestBody RoomDto roomDto){
        Room room = new Room.RoomBuilder(roomDto).build();
        roomRepository.save(room);
        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }
}
