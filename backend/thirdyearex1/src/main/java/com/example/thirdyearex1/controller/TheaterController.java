package com.example.thirdyearex1.controller;

import com.example.thirdyearex1.entity.Theater;
import com.example.thirdyearex1.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/theaters")
public class TheaterController {

    @Autowired
    private TheaterService theaterService;

    @PostMapping
    public Theater addTheater(@RequestBody Theater theater) {
        return theaterService.addTheater(theater);
    }

    @GetMapping
    public List<Theater> getAllTheaters() {
        return theaterService.getAllTheaters();
    }

    @GetMapping("/{id}")
    public Theater getTheater(@PathVariable Long id) {
        return theaterService.getTheaterById(id);
    }

    @PutMapping("/{id}")
    public Theater updateTheater(@PathVariable Long id,
                                 @RequestBody Theater theater) {
        return theaterService.updateTheater(id, theater);
    }

    @DeleteMapping("/{id}")
    public String deleteTheater(@PathVariable Long id) {
        theaterService.deleteTheater(id);
        return "Theater Deleted Successfully";
    }
}