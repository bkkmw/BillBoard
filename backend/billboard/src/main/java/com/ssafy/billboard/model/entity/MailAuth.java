package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name="mailauth")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class MailAuth {

    @Id
    @Column(name = "email", length = 45)
    private String email;

    @Column(name = "authKey", length = 10)
    private String authKey;

    @Column(name = "expireAt")
    private Timestamp expireAt;
}
