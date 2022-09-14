package com.dtrix.board.repository;

import com.dtrix.board.entity.Qdp_bulletin;
import com.dtrix.board.entity.dp_bulletin;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
public class BulletinRepositoryTests {

    @Autowired
    private dp_bulletinRepository bulletinRepository;

    @Test
    @DisplayName("createTestData")
    public void CreateTest() {

        // 300개의 testData 생성
        IntStream.rangeClosed(1,300).forEach( i-> {
            dp_bulletin bulletin = dp_bulletin.builder()
                    .title("Title.." + i)
                    .content("Content.." + i)
                    .writer("writer.." + i)
                    .hits(i)
                    .build();
            System.out.println(bulletinRepository.save(bulletin));
        });

    }

    @Test
    @DisplayName("updateTest&modDateTest")
    public void updateTest() {
        Optional<dp_bulletin> result = bulletinRepository.findById(1L);

        if (result.isPresent()) {
            dp_bulletin bulletin = result.get();

            bulletin.changeTitle("Change Title ... ");
            bulletin.changeContent("Change Content...");

            // 해당 id가 이미 존재하는 경우 insert 가 아니라 update 로 적용
            bulletinRepository.save(bulletin);
        }

    }

    @Test
    @DisplayName("selectTest & QueryDSL 1. Single search")
    public void selectTest_1() {

        // Pageable에 들어갈 bulletinId 등의 String은 Underbar 사용을 할 수 없다.
        Pageable pageable = PageRequest.of(0, 10, Sort.by("bulletinId").descending());

        // 동적으로 처리하기 위한 QDomain Class 를 가져옴. Entity 에 선언된 title, content같은 필드를 변수로 사용 가능
        Qdp_bulletin qdp_bulletin = Qdp_bulletin.dp_bulletin;

        String keyword = "91";

        // BooleanBuilder 는 where 문 안에 들어가는 조건들을 넣어주는 컨테이너
        BooleanBuilder builder = new BooleanBuilder();

        /*원하는 조건은 필드 값과 결합하여 생성
          BooleanBuilder 안에 들어가는 값은 Predicate 타입이어야한다.  */
        BooleanExpression expression = qdp_bulletin.title.contains(keyword);

        // 만들어진 조건은 where문에 and / or 같은 키워드와 결합
        builder.and(expression);

        // BooleanBuilder 는 bulletinRepository에 추가된 QuerydslPredicateExcutor 인터페이스의 findAll()을 사용가능.
        Page<dp_bulletin> result = bulletinRepository.findAll(builder, pageable);

        result.stream().forEach(dp_bulletin -> {
            System.out.println(dp_bulletin);
        });

    }

    @Test
    @DisplayName("selectTest & QueryDSL 2. Multiple searches")
    public void selectTest_2() {

        Pageable pageable = PageRequest.of(0, 10, Sort.by("bulletinId").descending());

        Qdp_bulletin qdp_bulletin = Qdp_bulletin.dp_bulletin;

        String keyword = "1";

        BooleanBuilder builder = new BooleanBuilder();

        BooleanExpression exTitle = qdp_bulletin.title.contains(keyword);
        BooleanExpression exContent = qdp_bulletin.content.contains(keyword);

        // 조건 결합
        BooleanExpression exAll = exTitle.or(exContent);

        // 조건 추가
        builder.and(exAll);

        // bulletinId는 0보다 크다는 조건 추가
        builder.and(qdp_bulletin.bulletinId.gt(0L));

        Page<dp_bulletin> result = bulletinRepository.findAll(builder, pageable);

        result.stream().forEach(dp_bulletin -> {
            System.out.println(dp_bulletin);
        });


    }

}
