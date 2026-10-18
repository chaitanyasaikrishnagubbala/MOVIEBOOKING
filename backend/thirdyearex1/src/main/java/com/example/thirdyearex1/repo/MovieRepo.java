package com.example.thirdyearex1.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thirdyearex1.entity.Movie;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Long> {

}