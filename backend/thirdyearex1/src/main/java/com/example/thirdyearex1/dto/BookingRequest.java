package com.example.thirdyearex1.dto;

import lombok.Data;

import java.util.List;

@Data
public class BookingRequest {

    private Long showId;

    private List<Long> seatIds;

    private String paymentMethod;
}