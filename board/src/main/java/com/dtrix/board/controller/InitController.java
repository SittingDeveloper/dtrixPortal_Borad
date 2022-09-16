package com.dtrix.board.controller;

import com.dtrix.board.dto.PageRequestDTO;
import com.dtrix.board.dto.PageResultDTO;
import com.dtrix.board.dto.dp_bulletinDTO;
import com.dtrix.board.entity.dp_bulletin;
import com.dtrix.board.service.dp_bulletinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
//        model.addAttribute("result", service.getList(pageRequestDTO));

        return service.getList(pageRequestDTO);
    }

}

