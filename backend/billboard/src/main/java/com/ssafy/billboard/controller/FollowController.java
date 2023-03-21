package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.FollowDto;
import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.model.entity.Follow;
import com.ssafy.billboard.model.entity.Room;
import com.ssafy.billboard.model.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping()
    public ResponseEntity<?> createFollow(@RequestBody FollowDto.FollowInput followInput){
        Follow follow = followService.createFollow(followInput);
        return new ResponseEntity<>(follow, HttpStatus.CREATED);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteFollow(@RequestBody FollowDto.FollowInput followInput){
        followService.deleteFollow(followInput);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/to/{userId}")
    public ResponseEntity<?> getFollowers(@PathVariable String userId){
        List<String> followers = followService.getFollowers(userId);
        if(followers == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(followers.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getFollowings(@PathVariable String userId){
        List<String> followings = followService.getFollowings(userId);
        if(followings == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if(followings.size() == 0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(followings, HttpStatus.OK);
    }

}
