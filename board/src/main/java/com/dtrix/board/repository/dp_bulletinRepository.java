package com.dtrix.board.repository;

import com.dtrix.board.entity.dp_bulletin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface dp_bulletinRepository extends JpaRepository<dp_bulletin, Long>, QuerydslPredicateExecutor<dp_bulletin> {
}
