package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.FollowDto;
import com.ssafy.billboard.model.entity.Follow;
import com.ssafy.billboard.model.repository.FollowRepository;
import com.ssafy.billboard.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Override
    public int createFollow(FollowDto.FollowInput followInput){
        //없는 유저 아이디 > 0
        if(!userRepository.existsByUserId(followInput.getFromUserId())
                || !userRepository.existsByUserId(followInput.getToUserId()))
            return 0;
        //이미 팔로우한 경우, 자기 자신을 팔로우하는 경우 > -1
        if(followRepository.existsByFromUserAndToUser(userRepository.findByUserId(followInput.getFromUserId()), userRepository.findByUserId(followInput.getToUserId()))
                || followInput.getFromUserId().equals(followInput.getToUserId()))
            return -1;
        followRepository.save(Follow.builder()
                .fromUser(userRepository.findByUserId(followInput.getFromUserId()))
                .toUser(userRepository.findByUserId(followInput.getToUserId()))
                .build());
        return 1;
    }

    @Override
    public int deleteFollow(FollowDto.FollowInput followInput){
        //없는 유저, 팔로우 중인 아닌 경우 > 0
        if(!userRepository.existsByUserId(followInput.getFromUserId())
                || !userRepository.existsByUserId(followInput.getToUserId())
                || !followRepository.existsByFromUserAndToUser(userRepository.findByUserId(followInput.getFromUserId()), userRepository.findByUserId(followInput.getToUserId())))
            return 0;
        followRepository.deleteByFromUserAndToUser(userRepository.findByUserId(followInput.getFromUserId()), userRepository.findByUserId(followInput.getToUserId()));
        return 1;
    }

    @Override
    public List<String> getFollowers(String toUserId){
        //없는 유저 아이디 > null
        if(!userRepository.existsByUserId(toUserId))
            return null;
        List<Follow> followersEntity = followRepository.findAllByToUser(userRepository.findByUserId(toUserId));
        List<String> followers = new ArrayList<>();
        for(Follow follow : followersEntity)
            followers.add(follow.getFromUser().getUserId());
        return followers;
    }

    @Override
    public List<String> getFollowings(String fromUserId){
        //없는 유저 아이디 > null
        if(!userRepository.existsByUserId(fromUserId))
            return null;
        List<Follow> followingsEntity = followRepository.findAllByFromUser(userRepository.findByUserId(fromUserId));
        List<String> followings = new ArrayList<>();
        for(Follow follow : followingsEntity)
            followings.add(follow.getToUser().getUserId());
        return followings;
    }
}
