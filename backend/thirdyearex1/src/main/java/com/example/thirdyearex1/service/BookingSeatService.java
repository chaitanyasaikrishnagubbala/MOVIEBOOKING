package com.example.thirdyearex1.service;

import com.example.thirdyearex1.entity.BookingSeat;

import java.util.List;

public interface BookingSeatService {

    BookingSeat addBookingSeat(BookingSeat bookingSeat);

    List<BookingSeat> getAllBookingSeats();

    BookingSeat getBookingSeatById(Long id);

    void deleteBookingSeat(Long id);
}
