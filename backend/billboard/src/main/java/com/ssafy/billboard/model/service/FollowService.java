package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.FollowDto;
import com.ssafy.billboard.model.entity.Follow;
import com.ssafy.billboard.model.repository.FollowRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;
    @Autowired
    private UserRepository userRepository;

    public Follow createFollow(FollowDto.FollowInput followInput){
        //없는 유저 처리, 이미 팔로우한 경우 처리
        Follow follow = Follow.builder()
                .fromUserId(followInput.getFromUserId())
                .toUserId(followInput.getToUserId())
                .build();
        return followRepository.save(follow);
    }

    public boolean deleteFollow(FollowDto.FollowInput followInput){
        //없는 유저, 팔로우중이 아닌 경우 처리 안 함
        followRepository.deleteByFromUserIdAndToUserId(followInput.getFromUserId(), followInput.getToUserId());
        return true;
    }

    public List<String> getFollowers(String toUserId){
        List<String> retFollowers = new ArrayList<>();
        List<Follow> followers = followRepository.findAllByToUserId(toUserId);
        for(Follow follow : followers)
            retFollowers.add(follow.getFromUserId());
        return retFollowers;
    }

    public List<String> getFollowings(String fromUserId){
        List<String> retFollowings = new ArrayList<>();
        List<Follow> followings = followRepository.findAllByFromUserId(fromUserId);
        for(Follow follow : followings)
            retFollowings.add(follow.getToUserId());
        return retFollowings;
    }
}
