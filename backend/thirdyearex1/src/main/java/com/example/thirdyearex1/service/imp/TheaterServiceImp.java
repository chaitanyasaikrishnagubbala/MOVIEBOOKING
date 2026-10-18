package com.example.thirdyearex1.service.imp;

import com.example.thirdyearex1.entity.Theater;
import com.example.thirdyearex1.repo.TheaterRepository;
import com.example.thirdyearex1.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TheaterServiceImp implements TheaterService {

    @Autowired
    private TheaterRepository theaterRepository;

    @Override
    public Theater addTheater(Theater theater) {
        return theaterRepository.save(theater);
    }

    @Override
    public List<Theater> getAllTheaters() {
        return theaterRepository.findAll();
    }

    @Override
    public Theater getTheaterById(Long id) {
        return theaterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Theater Not Found"));
    }

    @Override
    public Theater updateTheater(Long id, Theater theater) {

        Theater existing = getTheaterById(id);

        existing.setName(theater.getName());
        existing.setCity(theater.getCity());
        existing.setAddress(theater.getAddress());

        return theaterRepository.save(existing);
    }

    @Override
    public void deleteTheater(Long id) {

        Theater theater = getTheaterById(id);

        theaterRepository.delete(theater);
    }
}