package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Favorite;
import com.ssafy.billboard.model.entity.Review;
import com.ssafy.billboard.model.entity.ReviewID;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, ReviewID> {
    List<Review> findAllByGameId(int gameId);
    List<Review> findAllByUserId(String userId);
}
