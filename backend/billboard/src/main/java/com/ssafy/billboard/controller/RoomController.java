package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Entry;
import com.ssafy.billboard.model.entity.Reply;
import com.ssafy.billboard.model.entity.Room;
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
        Map<String, Object> resultMap = new HashMap<>();
        Room room = roomService.createRoom(roomInput);
        resultMap.put("room", room);
        return new ResponseEntity<>(resultMap, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<?> getRooms(){
        Map<String, Object> resultMap = new HashMap<>();
        List<Room> rooms = roomService.getRooms();
        resultMap.put("rooms", rooms);
        if(rooms.size() == 0)
            return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
        else
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> getRoom(@PathVariable long roomId){
        Map<String, Object> resultMap = new HashMap<>();
        Room room = roomService.getRoom(roomId);
        resultMap.put("room", room);
        if(room == null)
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        else
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
        Map<String, Object> resultMap = new HashMap<>();
        Room room = roomService.updateRoom(roomId, roomUpdate);
        resultMap.put("room", room);
        if(room == null)
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/reply")
    public ResponseEntity<?> createReply(@RequestBody RoomDto.ReplyInput replyInput){
        Map<String, Object> resultMap = new HashMap<>();
        Reply reply = roomService.createReply(replyInput);
        resultMap.put("reply", reply);
        if(reply == null)
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(resultMap, HttpStatus.CREATED);
    }

    @GetMapping("/reply/{roomId}")
    public ResponseEntity<?> getReplies(@PathVariable long roomId){
        Map<String, Object> resultMap = new HashMap<>();
        List<Reply> replies = roomService.getReplies(roomId);
        resultMap.put("replies", replies);
        if(replies == null)
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        if(replies.size() == 0)
            return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
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
        Map<String, Object> resultMap = new HashMap<>();
        Entry entry = roomService.createEntry(entryInput);
        resultMap.put("entry", entry);
        if(entry == null)
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(resultMap, HttpStatus.CREATED);
    }

    @DeleteMapping("/entry")
    public ResponseEntity<?> deleteEntry(@RequestBody RoomDto.EntryInput entryInput){
        if(roomService.deleteEntry(entryInput))
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
