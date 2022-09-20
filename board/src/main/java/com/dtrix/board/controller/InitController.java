package com.dtrix.board.controller;

import com.dtrix.board.dto.PageRequestDTO;
import com.dtrix.board.dto.PageResultDTO;
import com.dtrix.board.dto.dp_bulletinDTO;
import com.dtrix.board.entity.dp_bulletin;
import com.dtrix.board.service.dp_bulletinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api")
public class InitController {

    private final dp_bulletinService service;

    @GetMapping("/")
    public String index() {
        return "test";
    }

    @GetMapping("/page")
    public PageResultDTO<dp_bulletinDTO, dp_bulletin> list(PageRequestDTO pageRequestDTO) {

        log.info("list........" + pageRequestDTO);

        return service.getList(pageRequestDTO);
    }

    @GetMapping("/page/{getPage}")
    @CrossOrigin(origins = "*")
    public PageResultDTO<dp_bulletinDTO, dp_bulletin> searchList(PageRequestDTO pageRequestDTO, @PathVariable int getPage) {

        log.info("list........" + pageRequestDTO);
        pageRequestDTO.setPage(getPage);

        log.info("getPageList..... " + pageRequestDTO);
        return service.getList(pageRequestDTO);
    }

    @GetMapping("/register")
    public void register() {
        log.info("register get ... ");
    }

    @PostMapping("/register")
    public void registerPost(dp_bulletinDTO dto) {

        log.info("dto ...." + dto);

        // 새로 추가된 Entity 번호
        service.register(dto);
    }

    //, "/modify/{bulletinId}"
    @GetMapping("/pageDetail/{bulletinId}")
    public dp_bulletinDTO read(@PathVariable Long bulletinId) {

        log.info("bulletinId : " + bulletinId);
        return service.read(bulletinId);
    }

    @PostMapping("/remove") // 삭제
    public void remove(long bulletinId) {
        log.info("bulletinId : " + bulletinId);

        service.remove(bulletinId);
    }

    @PostMapping("/modify") //수정
    public void modify(dp_bulletinDTO dto) {
        log.info("post modify.............................\n");
        log.info("dto : " + dto);

        service.modify(dto);
    }

}

