package com.example.thirdyearex1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber;

    private String seatType;



    @ManyToOne
    @JoinColumn(name = "screen_id")
    private Screen screen;


    @OneToMany(mappedBy = "seat")
    @JsonIgnore
    private List<BookingSeat> bookingSeats;
}