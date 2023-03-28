package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping()
    public ResponseEntity<?> createRoom(@RequestBody RoomDto.RoomInput roomInput){
        Map<String, Object> resultMap = new HashMap<>();
        RoomDto.RoomInfo room = roomService.createRoom(roomInput);
        if(room == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        resultMap.put("room", room);
        return new ResponseEntity<>(resultMap, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<?> getRooms(){
        Map<String, Object> resultMap = new HashMap<>();
        List<RoomDto.RoomInfo> rooms = roomService.getRooms();
        if(rooms.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("rooms", rooms);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> getRoom(@PathVariable long roomId){
        Map<String, Object> resultMap = new HashMap<>();
        RoomDto.RoomDetailInfo room = roomService.getRoom(roomId);
        if(room == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        resultMap.put("room", room);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable long roomId){
        if(roomService.deleteRoom(roomId))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<?> updateRoom(@PathVariable long roomId, @RequestBody RoomDto.RoomUpdate roomUpdate){
        if(roomService.updateRoom(roomId, roomUpdate))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{roomId}/replies")
    public ResponseEntity<?> createReply(@PathVariable long roomId, @RequestBody RoomDto.ReplyInput replyInput){
        if(roomService.createReply(roomId, replyInput))
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{roomId}/replies")
    public ResponseEntity<?> getReplies(@PathVariable long roomId){
        Map<String, Object> resultMap = new HashMap<>();
        List<RoomDto.ReplyInfo> replies = roomService.getReplies(roomId);
        if(replies == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(replies.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("replies", replies);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<?> deleteReply(@PathVariable long replyId){
        if(roomService.deleteReply(replyId))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{roomId}/entries")
    public ResponseEntity<?> createEntry(@PathVariable long roomId, @RequestBody RoomDto.EntryInput entryInput){
        int res = roomService.createEntry(roomId, entryInput.getUserId());
        if(res == 1)
            return new ResponseEntity<>(HttpStatus.CREATED);
        else if(res == 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(res == -1)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/{roomId}/entries")
    public ResponseEntity<?> deleteEntry(@PathVariable long roomId, @RequestBody RoomDto.EntryInput entryInput){
        int res = roomService.deleteEntry(roomId, entryInput.getUserId());
        if(res == 1)
            return new ResponseEntity<>(HttpStatus.OK);
        else if(res == 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(res == -1)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/entries/{userId}")
    public ResponseEntity<?> getRoomsByEntry(@PathVariable String userId){
        Map<String, Object> resultMap = new HashMap<>();
        List<RoomDto.RoomReservationInfo> rooms = roomService.getRoomsByUserId(userId);
        if(rooms == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(rooms.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("rooms", rooms);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
