package com.example.thirdyearex1.controller;

import com.example.thirdyearex1.entity.BookingSeat;
import com.example.thirdyearex1.service.BookingSeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking-seats")
public class BookingSeatController {

    @Autowired
    private BookingSeatService bookingSeatService;

    @PostMapping
    public BookingSeat addBookingSeat(@RequestBody BookingSeat bookingSeat) {
        return bookingSeatService.addBookingSeat(bookingSeat);
    }

    @GetMapping
    public List<BookingSeat> getAllBookingSeats() {
        return bookingSeatService.getAllBookingSeats();
    }

    @GetMapping("/{id}")
    public BookingSeat getBookingSeat(@PathVariable Long id) {
        return bookingSeatService.getBookingSeatById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteBookingSeat(@PathVariable Long id) {

        bookingSeatService.deleteBookingSeat(id);

        return "Booking Seat Deleted Successfully";
    }
}