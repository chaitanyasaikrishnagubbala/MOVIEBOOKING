package com.example.thirdyearex1.service;

import com.example.thirdyearex1.entity.Theater;

import java.util.List;

public interface TheaterService {

    Theater addTheater(Theater theater);

    List<Theater> getAllTheaters();

    Theater getTheaterById(Long id);

    Theater updateTheater(Long id, Theater theater);

    void deleteTheater(Long id);
}