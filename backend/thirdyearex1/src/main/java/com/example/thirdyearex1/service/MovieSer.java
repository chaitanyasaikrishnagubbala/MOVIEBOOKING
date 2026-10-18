package com.example.thirdyearex1.service;

import java.util.List;

import com.example.thirdyearex1.dto.MovieDto;

public interface MovieSer {

    MovieDto addMovie(MovieDto movieDto);

    List<MovieDto> getAllMovies();

    MovieDto getMovieById(Long id);

    MovieDto updateMovie(Long id, MovieDto movieDto);

    void deleteMovie(Long id);
}