
package com.example.thirdyearex1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingResponse {

    private Long bookingId;

    private Double totalAmount;

    private String paymentStatus;

    private String message;
}