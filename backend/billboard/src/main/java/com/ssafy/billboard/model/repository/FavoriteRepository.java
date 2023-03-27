package com.ssafy.billboard.model.repository;

import com.ssafy.billboard.model.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite,String> {
}
