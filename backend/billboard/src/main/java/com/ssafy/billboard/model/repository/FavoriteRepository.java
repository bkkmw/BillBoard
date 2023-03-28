package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Favorite;
import com.ssafy.billboard.model.entity.FavoriteID;
import com.ssafy.billboard.model.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite,FavoriteID> {
    //List<Follow> findAllByFromUserId(String fromUserId);
    List<Favorite> findAllByUserId(String userId);
    Favorite findByUserId(String UserId);
}
