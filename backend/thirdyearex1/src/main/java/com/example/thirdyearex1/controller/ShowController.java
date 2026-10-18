package com.example.thirdyearex1.controller;

import com.example.thirdyearex1.entity.Show;
import com.example.thirdyearex1.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shows")
public class ShowController {

    @Autowired
    private ShowService showService;

    @PostMapping
    public Show addShow(@RequestBody Show show) {
        return showService.addShow(show);
    }

    @GetMapping
    public List<Show> getAllShows() {
        return showService.getAllShows();
    }

    @GetMapping("/{id}")
    public Show getShow(@PathVariable Long id) {
        return showService.getShowById(id);
    }

    @PutMapping("/{id}")
    public Show updateShow(@PathVariable Long id,
                           @RequestBody Show show) {
        return showService.updateShow(id, show);
    }

    @DeleteMapping("/{id}")
    public String deleteShow(@PathVariable Long id) {
        showService.deleteShow(id);
        return "Show Deleted Successfully";
    }
    @GetMapping("/movie/{movieId}")
    public List<Show> getShowsByMovieId(@PathVariable Long movieId) {
        return showService.getShowsByMovieId(movieId);
    }
}