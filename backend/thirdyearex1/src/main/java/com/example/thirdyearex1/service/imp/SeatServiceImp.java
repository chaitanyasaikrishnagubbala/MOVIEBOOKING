package com.example.thirdyearex1.service.imp;




import com.example.thirdyearex1.entity.Seat;

import com.example.thirdyearex1.repo.SeatRepository;
import com.example.thirdyearex1.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImp implements SeatService {

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public Seat addSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    @Override
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    @Override
    public Seat getSeatById(Long id) {
        return seatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat Not Found"));
    }

    @Override
    public List<Seat> getSeatsByScreen(Long screenId) {
        return seatRepository.findByScreenId(screenId);
    }

    @Override
    public Seat updateSeat(Long id, Seat seat) {

        Seat existing = getSeatById(id);

        existing.setSeatNumber(seat.getSeatNumber());
        existing.setSeatType(seat.getSeatType());
        existing.setScreen(seat.getScreen());

        return seatRepository.save(existing);
    }

    @Override
    public void deleteSeat(Long id) {

        Seat seat = getSeatById(id);

        seatRepository.delete(seat);
    }
}