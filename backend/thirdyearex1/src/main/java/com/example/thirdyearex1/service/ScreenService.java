package com.example.thirdyearex1.service;

import com.example.thirdyearex1.entity.Screen;

import java.util.List;

public interface ScreenService {

    Screen addScreen(Screen screen);

    List<Screen> getAllScreens();

    Screen getScreenById(Long id);

    Screen updateScreen(Long id, Screen screen);

    void deleteScreen(Long id);
}