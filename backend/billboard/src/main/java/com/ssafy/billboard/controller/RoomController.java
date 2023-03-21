package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Reply;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping()
    public ResponseEntity<?> createRoom(@RequestBody RoomDto.RoomInput roomInput){
        Room room = roomService.createRoom(roomInput);
        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<?> getRooms(){
        List<Room> rooms = roomService.getRooms();
        if(rooms.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        else
            return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> getRoom(@PathVariable int roomId){
        Room room = roomService.getRoom(roomId);
        if(room == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable int roomId){
        if(roomService.deleteRoom(roomId))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<?> updateRoom(@PathVariable int roomId, @RequestBody RoomDto.RoomUpdate roomUpdate){
        Room room = roomService.updateRoom(roomId, roomUpdate);
        if(room != null)
            return new ResponseEntity<>(room, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/reply")
    public ResponseEntity<?> createReply(@RequestBody RoomDto.ReplyInput replyInput){
        Reply reply = roomService.createReply(replyInput);
        if(reply == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(reply, HttpStatus.CREATED);
    }

    @GetMapping("/reply/{roomId}")
    public ResponseEntity<?> getReplies(@PathVariable int roomId){
        List<Reply> replies = roomService.getReplies(roomId);
        if(replies == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(replies.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }

    @DeleteMapping("/reply/{replyId}")
    public ResponseEntity<?> deleteReply(@PathVariable int replyId){
        if(roomService.deleteReply(replyId))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
