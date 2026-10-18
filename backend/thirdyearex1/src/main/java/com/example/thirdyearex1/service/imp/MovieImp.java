package com.example.thirdyearex1.service.imp;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thirdyearex1.dto.MovieDto;
import com.example.thirdyearex1.entity.Movie;
import com.example.thirdyearex1.repo.MovieRepo;
import com.example.thirdyearex1.service.MovieSer;

@Service
public class MovieImp implements MovieSer {

    @Autowired
    private MovieRepo movieRepo;

    // DTO -> Entity
    private Movie dtoToEntity(MovieDto dto) {

        Movie movie = new Movie();

        movie.setId(dto.getId());
        movie.setTitle(dto.getTitle());
        movie.setGenre(dto.getGenre());
        movie.setLanguage(dto.getLanguage());
        movie.setDuration(dto.getDuration());
        movie.setReleaseDate(dto.getReleaseDate());
        movie.setDescription(dto.getDescription());
        movie.setPosterUrl(dto.getPosterUrl());
        movie.setRating(dto.getRating());

        return movie;
    }

    // Entity -> DTO
    private MovieDto entityToDto(Movie movie) {

        MovieDto dto = new MovieDto();

        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setGenre(movie.getGenre());
        dto.setLanguage(movie.getLanguage());
        dto.setDuration(movie.getDuration());
        dto.setReleaseDate(movie.getReleaseDate());
        dto.setDescription(movie.getDescription());
        dto.setPosterUrl(movie.getPosterUrl());
        dto.setRating(movie.getRating());

        return dto;
    }

    @Override
    public MovieDto addMovie(MovieDto movieDto) {

        Movie movie = dtoToEntity(movieDto);

        Movie savedMovie = movieRepo.save(movie);

        return entityToDto(savedMovie);
    }

    @Override
    public List<MovieDto> getAllMovies() {

        return movieRepo.findAll()
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MovieDto getMovieById(Long id) {

        Movie movie = movieRepo.findById(id).orElse(null);

        if (movie == null) {
            return null;
        }

        return entityToDto(movie);
    }

    @Override
    public MovieDto updateMovie(Long id, MovieDto movieDto) {

        Movie existingMovie = movieRepo.findById(id).orElse(null);

        if (existingMovie == null) {
            return null;
        }

        existingMovie.setTitle(movieDto.getTitle());
        existingMovie.setGenre(movieDto.getGenre());
        existingMovie.setLanguage(movieDto.getLanguage());
        existingMovie.setDuration(movieDto.getDuration());
        existingMovie.setReleaseDate(movieDto.getReleaseDate());
        existingMovie.setDescription(movieDto.getDescription());
        existingMovie.setPosterUrl(movieDto.getPosterUrl());
        existingMovie.setRating(movieDto.getRating());

        Movie updatedMovie = movieRepo.save(existingMovie);

        return entityToDto(updatedMovie);
    }

    @Override
    public void deleteMovie(Long id) {
        movieRepo.deleteById(id);
    }
}