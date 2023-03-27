package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="baseaddress")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class BaseAddress {
    @Id
    @Column(nullable = false)
    private String dongCode;

    @Column
    private String sidoName;

    @Column
    private String gugunName;

    @Column
    private String dongName;

    @Column
    private String lat;

    @Column
    private String lng;
}
