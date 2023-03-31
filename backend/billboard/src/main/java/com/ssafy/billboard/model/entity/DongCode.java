package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="dongcode")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class DongCode {
    @Id
    @Column(nullable = false, length = 10)
    private String dongCode;

    @Column(nullable = false, length = 30)
    private String dongName;
}
