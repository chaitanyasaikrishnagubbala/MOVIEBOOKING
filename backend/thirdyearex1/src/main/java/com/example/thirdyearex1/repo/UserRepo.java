package com.example.thirdyearex1.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.thirdyearex1.entity.User;

public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}