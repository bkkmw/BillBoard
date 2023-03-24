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
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping()
    public ResponseEntity<?> createRoom(@RequestBody RoomDto.RoomInput roomInput){
        if(roomService.createRoom(roomInput))
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

    @PostMapping("/reply")
    public ResponseEntity<?> createReply(@RequestBody RoomDto.ReplyInput replyInput){
        if(roomService.createReply(replyInput))
            return new ResponseEntity<>(HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/reply/{roomId}")
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

    @DeleteMapping("/reply/{replyId}")
    public ResponseEntity<?> deleteReply(@PathVariable long replyId){
        if(roomService.deleteReply(replyId))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/entry")
    public ResponseEntity<?> createEntry(@RequestBody RoomDto.EntryInput entryInput){
        int res = roomService.createEntry(entryInput);
        if(res == 1)
            return new ResponseEntity<>(HttpStatus.CREATED);
        else if(res == 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(res == -1)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/entry")
    public ResponseEntity<?> deleteEntry(@RequestBody RoomDto.EntryInput entryInput){
        if(roomService.deleteEntry(entryInput))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
