package com.example.thirdyearex1.service;


import com.example.thirdyearex1.entity.Seat;

import java.util.List;

public interface SeatService {

    Seat addSeat(Seat seat);

    List<Seat> getAllSeats();

    Seat getSeatById(Long id);

    List<Seat> getSeatsByScreen(Long screenId);

    Seat updateSeat(Long id, Seat seat);

    void deleteSeat(Long id);
}