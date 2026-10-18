package com.example.thirdyearex1.service.imp;

import com.example.thirdyearex1.dto.BookingRequest;
import com.example.thirdyearex1.dto.BookingResponse;
import com.example.thirdyearex1.entity.*;
import com.example.thirdyearex1.exception.BookingNotFoundException;
import com.example.thirdyearex1.exception.SeatAlreadyBookedException;
import com.example.thirdyearex1.exception.ShowNotFoundException;
import com.example.thirdyearex1.exception.UserNotFoundException;
import com.example.thirdyearex1.repo.*;
import com.example.thirdyearex1.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingSeatRepository bookingSeatRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BookingRepository bookingRepository;


    // =================================
    // GET ALL BOOKINGS
    // =================================

    @Override
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }


    // =================================
    // GET BOOKING BY ID
    // =================================

    @Override
    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() ->
                        new BookingNotFoundException(
                                "Booking Not Found"
                        )
                );
    }


    // =================================
    // GET BOOKINGS BY USER ID
    // =================================

    @Override
    public List<Booking> getBookingsByUser(Long userId) {

        return bookingRepository.findByUserId(userId);
    }


    // =================================
    // GET BOOKED SEAT NUMBERS
    // =================================

    @Override
    public List<String> getBookedSeatNumbers(Long bookingId) {

        List<BookingSeat> bookingSeats =
                bookingSeatRepository.findByBookingId(bookingId);

        return bookingSeats.stream()
                .map(bookingSeat ->
                        bookingSeat.getSeat().getSeatNumber()
                )
                .toList();
    }


    // =================================
    // GET MY BOOKINGS BY EMAIL
    // =================================

    @Override
    public List<Booking> getBookingsByEmail(String email) {

        return bookingRepository.findByUserEmail(email);
    }


    // =================================
    // GET BOOKED SEAT IDS FOR SHOW
    // =================================

    @Override
    public List<Long> getBookedSeatIds(Long showId) {

        return bookingSeatRepository
                .findBookedSeatIdsByShowId(showId);
    }


    // =================================
    // CANCEL BOOKING
    // =================================

    @Override
    public void cancelBooking(Long id) {

        Booking booking =
                getBookingById(id);

        booking.setBookingStatus(
                "CANCELLED"
        );

        bookingRepository.save(booking);
    }


    // =================================
    // BOOK TICKETS
    // =================================

    @Override
    @Transactional
    public BookingResponse bookTickets(
            BookingRequest request,
            String email) {


        // -----------------------------
        // FIND USER
        // -----------------------------

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new UserNotFoundException(
                                        "User Not Found"
                                )
                        );


        // -----------------------------
        // FIND SHOW
        // -----------------------------

        Show show =
                showRepository
                        .findById(
                                request.getShowId()
                        )
                        .orElseThrow(() ->
                                new ShowNotFoundException(
                                        "Show Not Found"
                                )
                        );


        // -----------------------------
        // FIND SEATS
        // -----------------------------

        List<Seat> seats =
                seatRepository.findAllById(
                        request.getSeatIds()
                );


        // -----------------------------
        // CHECK SEAT AVAILABILITY
        // -----------------------------

        for (Seat seat : seats) {

            long booked =
                    bookingSeatRepository
                            .countBookedSeat(
                                    show.getId(),
                                    seat.getId()
                            );

            if (booked > 0) {

                throw new SeatAlreadyBookedException(
                        "Seat "
                                + seat.getSeatNumber()
                                + " is already booked."
                );
            }
        }


        // -----------------------------
        // CREATE BOOKING
        // -----------------------------

        Booking booking =
                new Booking();

        booking.setUser(user);

        booking.setShow(show);

        booking.setBookingTime(
                LocalDateTime.now()
        );

        booking.setBookingStatus(
                "CONFIRMED"
        );


        // -----------------------------
        // CALCULATE AMOUNT
        // -----------------------------

        double pricePerSeat = 200;

        double totalAmount =
                seats.size()
                        * pricePerSeat;

        booking.setTotalAmount(
                totalAmount
        );


        // -----------------------------
        // SAVE BOOKING
        // -----------------------------

        booking =
                bookingRepository.save(
                        booking
                );


        // -----------------------------
        // SAVE BOOKING SEATS
        // -----------------------------

        for (Seat seat : seats) {

            BookingSeat bookingSeat =
                    new BookingSeat();

            bookingSeat.setBooking(
                    booking
            );

            bookingSeat.setSeat(
                    seat
            );

            bookingSeatRepository.save(
                    bookingSeat
            );
        }


        // -----------------------------
        // CREATE TRANSACTION
        // -----------------------------

        Transaction transaction =
                new Transaction();

        transaction.setBooking(
                booking
        );

        transaction.setAmount(
                totalAmount
        );

        transaction.setPaymentMethod(
                request.getPaymentMethod()
        );

        transaction.setPaymentStatus(
                "SUCCESS"
        );

        transaction.setTransactionTime(
                LocalDateTime.now()
        );

        transaction.setTransactionId(
                UUID.randomUUID()
                        .toString()
        );


        // -----------------------------
        // SAVE TRANSACTION
        // -----------------------------

        transactionRepository.save(
                transaction
        );


        // -----------------------------
        // RETURN RESPONSE
        // -----------------------------

        return new BookingResponse(

                booking.getId(),

                totalAmount,

                transaction.getPaymentStatus(),

                "Booking Successful"
        );
    }
}