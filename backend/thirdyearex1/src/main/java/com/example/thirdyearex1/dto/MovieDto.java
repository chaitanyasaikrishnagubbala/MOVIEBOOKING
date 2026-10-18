package com.example.thirdyearex1.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieDto {

    private Long id;

    private String title;

    private String genre;

    private String language;

    private Integer duration;

    private LocalDate releaseDate;

    private String description;

    private String posterUrl;

    private Double rating;
}