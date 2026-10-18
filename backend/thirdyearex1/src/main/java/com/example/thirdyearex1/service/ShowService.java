package com.example.thirdyearex1.service;

import com.example.thirdyearex1.entity.Show;

import java.util.List;

public interface ShowService {

    Show addShow(Show show);

    List<Show> getAllShows();

    Show getShowById(Long id);

    Show updateShow(Long id, Show show);

    void deleteShow(Long id);
    List<Show> getShowsByMovieId(Long movieId);
}