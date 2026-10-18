package com.example.thirdyearex1.repo;

import com.example.thirdyearex1.entity.BookingSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingSeatRepository
        extends JpaRepository<BookingSeat, Long> {

    List<BookingSeat> findByBookingId(Long bookingId);

    List<BookingSeat> findBySeatId(Long seatId);

    @Query("""
        SELECT COUNT(bs)
        FROM BookingSeat bs
        WHERE bs.booking.show.id = :showId
        AND bs.seat.id = :seatId
        AND bs.booking.bookingStatus = 'CONFIRMED'
        """)
    long countBookedSeat(
            @Param("showId") Long showId,
            @Param("seatId") Long seatId
    );

    @Query("""
        SELECT bs.seat.id
        FROM BookingSeat bs
        WHERE bs.booking.show.id = :showId
        AND bs.booking.bookingStatus = 'CONFIRMED'
        """)
    List<Long> findBookedSeatIdsByShowId(
            @Param("showId") Long showId
    );
}