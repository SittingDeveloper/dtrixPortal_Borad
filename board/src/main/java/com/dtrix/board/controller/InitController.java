package com.dtrix.board.controller;

import com.dtrix.board.dto.PageRequestDTO;
import com.dtrix.board.dto.PageResultDTO;
import com.dtrix.board.dto.dp_bulletinDTO;
import com.dtrix.board.entity.dp_bulletin;
import com.dtrix.board.service.dp_bulletinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
    public String registerPost(dp_bulletinDTO dto, RedirectAttributes redirectAttributes) {

        log.info("dto ...." + dto);

        // 새로 추가된 Entity 번호
        Long bulletinId = service.register(dto);

        redirectAttributes.addFlashAttribute("msg", bulletinId);

        return "redirect:/api/page";
    }

}

