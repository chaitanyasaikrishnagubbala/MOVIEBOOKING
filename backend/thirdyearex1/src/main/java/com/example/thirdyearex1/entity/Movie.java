package com.example.thirdyearex1.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private LocalDate releaseDate;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private String posterUrl;

    @Column(nullable = false)
    private Double rating;
    @OneToMany(mappedBy = "movie")
    @JsonIgnore
    private List<Show> shows;
}