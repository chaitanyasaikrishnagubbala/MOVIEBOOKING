package com.example.thirdyearex1.repo;

import com.example.thirdyearex1.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.thirdyearex1.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);
    List<Booking> findByUserEmail(String email);
}