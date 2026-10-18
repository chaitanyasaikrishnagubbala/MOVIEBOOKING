package com.example.thirdyearex1.service;

import com.example.thirdyearex1.dto.BookingRequest;
import com.example.thirdyearex1.dto.BookingResponse;
import com.example.thirdyearex1.entity.Booking;

import java.util.List;

public interface BookingService {

    List<Booking> getAllBookings();

    Booking getBookingById(Long id);

    List<Booking> getBookingsByUser(Long userId);

    List<String> getBookedSeatNumbers(Long bookingId);

    List<Booking> getBookingsByEmail(String email);

    // IMPORTANT
    List<Long> getBookedSeatIds(Long showId);

    void cancelBooking(Long id);

    BookingResponse bookTickets(
            BookingRequest request,
            String email
    );
}