package com.dtrix.board.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(value = {AuditingEntityListener.class}) // 객체 생성/변경 감지
@Getter
public class BaseEntity {

    // JPA에서 엔티티의 생성시간을 처리
    @CreatedDate
    @Column(name = "regdate", updatable = false) // 객체 DB에 반영할 때 regdate Column 변경 X
    private LocalDateTime regDate;

    @LastModifiedDate
    @Column(name = "moddate")
    private LocalDateTime modDate;

}
