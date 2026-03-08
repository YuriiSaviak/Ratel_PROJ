package com.ratelmind.backend.repo;

import com.ratelmind.backend.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ResultRepository extends JpaRepository<Result, UUID> {
}
