package com.dtrix.board.service;

import com.dtrix.board.dto.PageRequestDTO;
import com.dtrix.board.dto.PageResultDTO;
import com.dtrix.board.dto.dp_bulletinDTO;
import com.dtrix.board.entity.dp_bulletin;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BulletinServiceTest {

    @Autowired
    private dp_bulletinService service;

    @Test
    @DisplayName("Register Test")
    public void registerTest() {

        dp_bulletinDTO bulletinDTO = dp_bulletinDTO.builder()
                .title("Sample Title ... ")
                .content("Sample Content ... ")
                .writer("user0")
                .hits(112911)
                .build();

        System.out.println(service.register(bulletinDTO));

    }

    @Test
    @DisplayName("TestList")
    public void testList() {

        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .build();

        PageResultDTO<dp_bulletinDTO, dp_bulletin> resultDTO = service.getList(pageRequestDTO);

        /*for (dp_bulletinDTO bulletinDTO : resultDTO.getDtoList()) {
            System.out.println(bulletinDTO);
        }*/

        System.out.println("PREV : " + resultDTO.isPrev()); // 이전 페이지 존재여부
        System.out.println("NEXT : " + resultDTO.isNext()); // 다음 페이지 존재 여부
        System.out.println("TOTAL : " + resultDTO.getTotalPage()); // 전체 페이지의 개수

        System.out.println("--------------------------------------");
        for (dp_bulletinDTO bulletinDTO : resultDTO.getDtoList()) {
            System.out.println(bulletinDTO);
        }

        System.out.println("======================================");

        // 화면에 출력될 페이지 번호
        resultDTO.getPageList().forEach(i -> System.out.println(i));

    }
}
