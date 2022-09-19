package com.dtrix.board.service;

import com.dtrix.board.dto.PageRequestDTO;
import com.dtrix.board.dto.PageResultDTO;
import com.dtrix.board.dto.dp_bulletinDTO;
import com.dtrix.board.entity.dp_bulletin;
import com.dtrix.board.repository.dp_bulletinRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
@Log4j2
@RequiredArgsConstructor
public class dp_bulletinServiceImpl implements dp_bulletinService {

    private final dp_bulletinRepository repository;

    @Override
    public Long register(dp_bulletinDTO dto) {

        log.info("DTO -----------------");
        log.info(dto);

        dp_bulletin entity = dtoToEntity(dto);

        log.info(entity);

        repository.save(entity);

        return entity.getBulletinId();
    }

    @Override
    public dp_bulletinDTO read(Long bulletinId) {

        Optional<dp_bulletin> result = repository.findById(bulletinId);

        System.out.println("backend bulletinId : " + bulletinId);
        return result.isPresent() ? entityToDto(result.get()) : null;

    }

    @Override
    public PageResultDTO<dp_bulletinDTO, dp_bulletin> getList(PageRequestDTO requestDTO) {
        Pageable pageable = requestDTO.getPageable(Sort.by("bulletinId").descending());

        Page<dp_bulletin> result = repository.findAll(pageable);

        Function<dp_bulletin, dp_bulletinDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(result, fn);

    }


}
