package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.FollowDto;
import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Follow;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/followes")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping()
    public ResponseEntity<?> createFollow(@RequestBody FollowDto.FollowInput followInput){
        int res = followService.createFollow(followInput);
        if(res == 1)
            return new ResponseEntity<>(HttpStatus.CREATED);
        else if(res == 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else if(res == -1)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteFollow(@RequestBody FollowDto.FollowInput followInput){
        int res = followService.deleteFollow(followInput);
        if(res == 1)
            return new ResponseEntity<>(HttpStatus.OK);
        else if(res == 0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/to/{userId}")
    public ResponseEntity<?> getFollowers(@PathVariable String userId){
        Map<String, Object> resultMap = new HashMap<>();
        List<String> followers = followService.getFollowers(userId);
        if(followers == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(followers.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("followers", followers);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/from/{userId}")
    public ResponseEntity<?> getFollowings(@PathVariable String userId){
        Map<String, Object> resultMap = new HashMap<>();
        List<String> followings = followService.getFollowings(userId);
        if(followings == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(followings.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        resultMap.put("followings", followings);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

}
