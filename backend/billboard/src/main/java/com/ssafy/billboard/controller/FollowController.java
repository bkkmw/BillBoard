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
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping()
    public ResponseEntity<?> createFollow(@RequestBody FollowDto.FollowInput followInput){
        Map<String, Object> resultMap = new HashMap<>();
        Follow follow = followService.createFollow(followInput);
        resultMap.put("follow", follow);
        return new ResponseEntity<>(resultMap, HttpStatus.CREATED);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteFollow(@RequestBody FollowDto.FollowInput followInput){
        followService.deleteFollow(followInput);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/to/{userId}")
    public ResponseEntity<?> getFollowers(@PathVariable String userId){
        Map<String, Object> resultMap = new HashMap<>();
        List<String> followers = followService.getFollowers(userId);
        resultMap.put("followers", followers);
        if(followers == null)
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        if(followers.size() == 0)
            return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/from/{userId}")
    public ResponseEntity<?> getFollowings(@PathVariable String userId){
        Map<String, Object> resultMap = new HashMap<>();
        List<String> followings = followService.getFollowings(userId);
        resultMap.put("followings", followings);
        if(followings == null)
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        if(followings.size() == 0)
            return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

}
