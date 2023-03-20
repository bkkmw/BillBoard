package com.ssafy.billboard.model.entity;

import com.ssafy.billboard.model.dto.UserSignUpDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
public class User {

    @Id
    @Column(name = "user_id", length = 45)
    private String userId;

    @Column(name = "password", length = 64)
    private String password;

    @Column(name = "nickname", length = 45)
    private String nickname;

    @Column(name = "email", length = 45)
    private String email;

    @Column(name = "state", length = 10)
    @ColumnDefault("'offline'")
    private String state;

    @Column(name = "match_count")
    @ColumnDefault("0")
    private int matchCount;

    @Column(name = "win_count")
    @ColumnDefault("0")
    private int winCount;

    @Column(name = "experience")
    private int experience;

    @Column(name = "refresh_token", length = 200)
    private String refreshToken;

    private User(UserBuilder builder) {
        this.userId = builder.userId;
        this.password = builder.password;
        this.nickname = builder.nickname;
        this.email = builder.email;
        this.state = builder.state;
        this.matchCount = builder.matchCount;
        this.winCount = builder.winCount;
        this.experience = builder.experience;
        this.refreshToken = builder.refreshToken;
    }

    public static class UserBuilder {
        private String userId;
        private String password;
        private String nickname;
        private String email;
        private String state;
        private int matchCount;
        private int winCount;
        private int experience;
        private String refreshToken;

        public UserBuilder(UserSignUpDto userSignUpDto){
            this.userId = userSignUpDto.getUserId();
            this.password = userSignUpDto.getPassword();
            this.nickname = userSignUpDto.getNickname();
            this.email = userSignUpDto.getEmail();
        }

        public UserBuilder setState(String state) {
            this.state = state;
            return this;
        }

        public UserBuilder setmMatchCount(int matchCount){
            this.matchCount = matchCount;
            return this;
        }

        public UserBuilder setWinCount(int winCount){
            this.winCount = winCount;
            return this;
        }

        public UserBuilder setRefreshToken(String refreshToken){
            this.refreshToken = refreshToken;
            return this;
        }

        public User build(){
            return new User(this);
        }
    }
}
