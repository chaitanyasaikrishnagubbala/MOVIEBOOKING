package com.example.thirdyearex1.controller;

import com.example.thirdyearex1.entity.Seat;
import com.example.thirdyearex1.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seats")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @PostMapping
    public Seat addSeat(@RequestBody Seat seat) {
        return seatService.addSeat(seat);
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/{id}")
    public Seat getSeat(@PathVariable Long id) {
        return seatService.getSeatById(id);
    }

    @GetMapping("/screen/{screenId}")
    public List<Seat> getSeatsByScreen(@PathVariable Long screenId) {
        return seatService.getSeatsByScreen(screenId);
    }

    @PutMapping("/{id}")
    public Seat updateSeat(@PathVariable Long id,
                           @RequestBody Seat seat) {
        return seatService.updateSeat(id, seat);
    }

    @DeleteMapping("/{id}")
    public String deleteSeat(@PathVariable Long id) {
        seatService.deleteSeat(id);
        return "Seat Deleted Successfully";
    }
}