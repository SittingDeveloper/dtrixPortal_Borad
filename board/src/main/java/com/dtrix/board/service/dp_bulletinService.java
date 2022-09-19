package com.dtrix.board.service;

import com.dtrix.board.dto.PageRequestDTO;
import com.dtrix.board.dto.PageResultDTO;
import com.dtrix.board.dto.dp_bulletinDTO;
import com.dtrix.board.entity.dp_bulletin;

public interface dp_bulletinService {


    // 등록 (Create)
    Long register(dp_bulletinDTO dto);

    // 조회 (Read)
    dp_bulletinDTO read(Long bulletinId);
    PageResultDTO<dp_bulletinDTO, dp_bulletin> getList(PageRequestDTO requestDTO);

    // 인터페이스의 실제 내용을 가지는 코드, 인터페이스 -> 추상클래스 -> 구현클래스에서 추상클래스 생략을 가능하게 해준다.
    default dp_bulletin dtoToEntity(dp_bulletinDTO dto) {

        dp_bulletin entity = dp_bulletin.builder()
                .bulletinId(dto.getBulletinId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(dto.getWriter())
                .hits(dto.getHits())
                .build();

        return entity;
    }

    default dp_bulletinDTO entityToDto(dp_bulletin entity) {
        dp_bulletinDTO dto = dp_bulletinDTO.builder()
                .bulletinId(entity.getBulletinId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .writer(entity.getWriter())
                .hits(entity.getHits())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .build();

        return dto;
    }

}
