package com.ratelmind.backend.repo;

import com.ratelmind.backend.model.EventResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventResultRepository extends JpaRepository<EventResult, Long> {
    List<EventResult> findByRoomCodeOrderByTotalScoreDesc(String roomCode);
    Optional<EventResult> findByRoomCodeAndNickname(String roomCode, String nickname);
}
