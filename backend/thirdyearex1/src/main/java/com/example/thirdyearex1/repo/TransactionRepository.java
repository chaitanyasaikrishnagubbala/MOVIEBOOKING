package com.example.thirdyearex1.repo;

import com.example.thirdyearex1.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}