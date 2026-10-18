package com.example.thirdyearex1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String paymentMethod;   // UPI, CARD, NET_BANKING

    @Column(nullable = false)
    private String paymentStatus;   // SUCCESS, FAILED, PENDING

    @Column(nullable = false)
    private LocalDateTime transactionTime;

    @Column(unique = true)
    private String transactionId;

    @OneToOne
    @JoinColumn(name = "booking_id")
    @JsonIgnore
    private Booking booking;
}