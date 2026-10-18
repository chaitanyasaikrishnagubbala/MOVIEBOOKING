package com.example.thirdyearex1.service.imp;

import com.example.thirdyearex1.entity.Screen;
import com.example.thirdyearex1.repo.ScreenRepository;
import com.example.thirdyearex1.service.ScreenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScreenServiceImpl implements ScreenService {

    @Autowired
    private ScreenRepository screenRepository;

    @Override
    public Screen addScreen(Screen screen) {
        return screenRepository.save(screen);
    }

    @Override
    public List<Screen> getAllScreens() {
        return screenRepository.findAll();
    }

    @Override
    public Screen getScreenById(Long id) {
        return screenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Screen Not Found"));
    }

    @Override
    public Screen updateScreen(Long id, Screen screen) {

        Screen existing = getScreenById(id);

        existing.setName(screen.getName());
        existing.setTotalSeats(screen.getTotalSeats());
        existing.setTheater(screen.getTheater());

        return screenRepository.save(existing);
    }

    @Override
    public void deleteScreen(Long id) {

        Screen screen = getScreenById(id);

        screenRepository.delete(screen);
    }
}