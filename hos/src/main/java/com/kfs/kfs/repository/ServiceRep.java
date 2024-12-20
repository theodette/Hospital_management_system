package com.kfs.kfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kfs.kfs.modell.UserMessage;

public interface ServiceRep extends JpaRepository<UserMessage, Integer> {
}
