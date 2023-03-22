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
        if(!userRepository.existsByUserId(followInput.getFromUserId()) || !userRepository.existsByUserId(followInput.getToUserId()))
            return 0;
        if(followRepository.existsByFromUserIdAndToUserId(followInput.getFromUserId(), followInput.getToUserId()))
            return -1;
        followRepository.save(Follow.builder()
                .fromUserId(followInput.getFromUserId())
                .toUserId(followInput.getToUserId())
                .build());
        return 1;
    }

    @Override
    public int deleteFollow(FollowDto.FollowInput followInput){
        if(!userRepository.existsByUserId(followInput.getFromUserId())
                || !userRepository.existsByUserId(followInput.getToUserId())
                || !followRepository.existsByFromUserIdAndToUserId(followInput.getFromUserId(), followInput.getToUserId()))
            return 0;
        followRepository.deleteByFromUserIdAndToUserId(followInput.getFromUserId(), followInput.getToUserId());
        return 1;
    }

    @Override
    public List<String> getFollowers(String toUserId){
        if(!userRepository.existsByUserId(toUserId))
            return null;
        List<Follow> followersEntity = followRepository.findAllByToUserId(toUserId);
        List<String> followers = new ArrayList<>();
        for(Follow follow : followersEntity)
            followers.add(follow.getFromUserId());
        return followers;
    }

    @Override
    public List<String> getFollowings(String fromUserId){
        if(!userRepository.existsByUserId(fromUserId))
            return null;
        List<Follow> followingsEntity = followRepository.findAllByFromUserId(fromUserId);
        List<String> followings = new ArrayList<>();
        for(Follow follow : followingsEntity)
            followings.add(follow.getToUserId());
        return followings;
    }
}
