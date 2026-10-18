package com.example.thirdyearex1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.thirdyearex1.dto.MovieDto;
import com.example.thirdyearex1.service.MovieSer;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieSer movieSer;

    // Create Movie
    @PostMapping
    public MovieDto addMovie(@RequestBody MovieDto movieDto) {
        return movieSer.addMovie(movieDto);
    }

    // Get All Movies
    @GetMapping
    public List<MovieDto> getAllMovies() {
        return movieSer.getAllMovies();
    }

    // Get Movie By Id
    @GetMapping("/{id}")
    public MovieDto getMovieById(@PathVariable Long id) {
        return movieSer.getMovieById(id);
    }

    // Update Movie
    @PutMapping("/{id}")
    public MovieDto updateMovie(@PathVariable Long id,
                                @RequestBody MovieDto movieDto) {
        return movieSer.updateMovie(id, movieDto);
    }

    // Delete Movie
    @DeleteMapping("/{id}")
    public String deleteMovie(@PathVariable Long id) {
        movieSer.deleteMovie(id);
        return "Movie deleted successfully.";
    }
}