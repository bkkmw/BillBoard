package com.ssafy.billboard.model.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Collection;

@Entity
@Table(name="user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@DynamicInsert
public class User implements UserDetails {

    @Id
    @Column(name = "userId", length = 45)
    private String userId;

    @Column(name = "password", length = 64)
    private String password;

    @Column(name = "nickname", length = 45)
    private String nickname;

    @Column(name = "email", length = 45, unique = true)
    private String email;

    @Column(name = "state", length = 10)
    @ColumnDefault("'offline'")
    private String state;

    @Column(name = "matchCount")
    @ColumnDefault("0")
    private int matchCount;

    @Column(name = "winCount")
    @ColumnDefault("0")
    private int winCount;

    @Column(name = "experience")
    private int experience;

    @Column(name = "refreshToken", length = 200)
    private String refreshToken;

    @Column(name = "img", length = 200)
    private String img;

    public void updateOnLogin(String refreshToken) {
        this.refreshToken = refreshToken;
        this.state = "online";
    }

    public void updateOnLogout() {
        this.refreshToken = "";
        this.state = "offline";
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
