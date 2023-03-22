package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.FollowDto;
import com.ssafy.billboard.model.entity.Follow;

import java.util.List;

public interface FollowService {
    public Follow createFollow(FollowDto.FollowInput followInput);

    public boolean deleteFollow(FollowDto.FollowInput followInput);

    public List<String> getFollowers(String toUserId);

    public List<String> getFollowings(String fromUserId);
}
