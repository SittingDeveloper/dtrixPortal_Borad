package com.dtrix.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class dp_bulletinDTO {

    private Long bulletinId;
    private String title;
    private String content;
    private String writer;
    private Integer hits;
    private LocalDateTime regDate, modDate;

}
