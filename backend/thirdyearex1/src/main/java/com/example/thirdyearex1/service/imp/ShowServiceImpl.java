package com.example.thirdyearex1.service.imp;

import com.example.thirdyearex1.entity.Show;
import com.example.thirdyearex1.repo.ShowRepository;
import com.example.thirdyearex1.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowServiceImpl implements ShowService {

    @Autowired
    private ShowRepository showRepository;

    @Override
    public Show addShow(Show show) {
        return showRepository.save(show);
    }

    @Override
    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    @Override
    public Show getShowById(Long id) {
        return showRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Show Not Found"));
    }

    @Override
    public Show updateShow(Long id, Show show) {

        Show existing = getShowById(id);

        existing.setShowDate(show.getShowDate());
        existing.setShowTime(show.getShowTime());
        existing.setTicketPrice(show.getTicketPrice());
        existing.setMovie(show.getMovie());
        existing.setScreen(show.getScreen());

        return showRepository.save(existing);
    }

    @Override
    public void deleteShow(Long id) {
        showRepository.delete(getShowById(id));
    }
    @Override
    public List<Show> getShowsByMovieId(Long movieId) {
        return showRepository.findByMovieId(movieId);
    }
}