package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sidocode")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class SidoCode {
    @Id
    @Column(nullable = false, length = 10)
    private String sidoCode;

    @Column(nullable = false, length = 30)
    private String sidoName;
}
