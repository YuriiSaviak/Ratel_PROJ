package com.ratelmind.backend.repo;

import com.ratelmind.backend.dto.GlobalStatsDto;
import com.ratelmind.backend.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ResultRepository extends JpaRepository<Result, UUID> {

    @Query("""
            SELECT new com.ratelmind.backend.dto.GlobalStatsDto(
                COUNT(r),
                AVG(r.totalScore),
                MIN(r.totalScore),
                MAX(r.totalScore),
                (CAST((SELECT COUNT(rs) FROM Result rs WHERE rs.totalScore <= :score) AS double) * 100.0) / COUNT(r),
                SUM(CASE WHEN r.level = 1 THEN 1 ELSE 0 END),
                SUM(CASE WHEN r.level = 2 THEN 1 ELSE 0 END),
                SUM(CASE WHEN r.level = 3 THEN 1 ELSE 0 END),
                SUM(CASE WHEN r.level = 4 THEN 1 ELSE 0 END),
                SUM(CASE WHEN r.level = 5 THEN 1 ELSE 0 END)
            )
            FROM Result r
            """)
    GlobalStatsDto buildGlobalStats(@Param("score") int userScore);

}
