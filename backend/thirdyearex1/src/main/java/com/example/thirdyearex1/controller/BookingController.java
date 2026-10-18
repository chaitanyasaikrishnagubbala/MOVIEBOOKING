package com.example.thirdyearex1.controller;

import com.example.thirdyearex1.dto.BookingRequest;
import com.example.thirdyearex1.dto.BookingResponse;
import com.example.thirdyearex1.entity.Booking;
import com.example.thirdyearex1.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    // Get all bookings
    @GetMapping
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }
    @GetMapping("/my-bookings")
    public List<Booking> getMyBookings() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return bookingService.getBookingsByEmail(email);
    }

    // Get booking by ID


    // Get user's bookings
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(
            @PathVariable Long userId) {

        return bookingService.getBookingsByUser(userId);
    }


    // Cancel booking
    @PutMapping("/cancel/{id}")
    public String cancelBooking(
            @PathVariable Long id) {

        bookingService.cancelBooking(id);

        return "Booking Cancelled Successfully";
    }


    // Get already booked seats for a show
    @GetMapping("/show/{showId}/seats")
    public List<Long> getBookedSeatIds(
            @PathVariable Long showId) {

        return bookingService.getBookedSeatIds(showId);
    }
    @GetMapping("/{id}")
    public Booking getBooking(
            @PathVariable Long id) {

        return bookingService.getBookingById(id);
    }


    @GetMapping("/{id}/seats")
    public List<String> getBookedSeatNumbers(
            @PathVariable Long id) {

        return bookingService.getBookedSeatNumbers(id);
    }


    // Book tickets
    @PostMapping("/book")
    public BookingResponse bookTickets(
            @RequestBody BookingRequest request) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return bookingService.bookTickets(
                request,
                email
        );

    }
}