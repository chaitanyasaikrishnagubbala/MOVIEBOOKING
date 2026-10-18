package com.example.thirdyearex1.service.imp;

import com.example.thirdyearex1.entity.BookingSeat;
import com.example.thirdyearex1.repo.BookingSeatRepository;
import com.example.thirdyearex1.service.BookingSeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingSeatServiceImp implements BookingSeatService {

    @Autowired
    private BookingSeatRepository bookingSeatRepository;

    @Override
    public BookingSeat addBookingSeat(BookingSeat bookingSeat) {
        return bookingSeatRepository.save(bookingSeat);
    }

    @Override
    public List<BookingSeat> getAllBookingSeats() {
        return bookingSeatRepository.findAll();
    }

    @Override
    public BookingSeat getBookingSeatById(Long id) {
        return bookingSeatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking Seat Not Found"));
    }

    @Override
    public void deleteBookingSeat(Long id) {

        BookingSeat bookingSeat = getBookingSeatById(id);

        bookingSeatRepository.delete(bookingSeat);
    }

}