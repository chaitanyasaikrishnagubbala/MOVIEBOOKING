package com.example.thirdyearex1.service.imp;

import com.example.thirdyearex1.entity.Transaction;
import com.example.thirdyearex1.repo.TransactionRepository;
import com.example.thirdyearex1.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionServiceImp implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction addTransaction(Transaction transaction) {

        transaction.setTransactionTime(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction getTransactionById(Long id) {

        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction Not Found"));
    }

    @Override
    public Transaction updateTransaction(Long id, Transaction transaction) {

        Transaction existing = getTransactionById(id);

        existing.setAmount(transaction.getAmount());
        existing.setPaymentMethod(transaction.getPaymentMethod());
        existing.setPaymentStatus(transaction.getPaymentStatus());
        existing.setTransactionId(transaction.getTransactionId());
        existing.setBooking(transaction.getBooking());

        return transactionRepository.save(existing);
    }

    @Override
    public void deleteTransaction(Long id) {

        Transaction transaction = getTransactionById(id);

        transactionRepository.delete(transaction);
    }
}