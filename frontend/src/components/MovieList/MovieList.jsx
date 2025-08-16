import React, { useState, useRef } from "react";
import { movies } from "../../data/Movies";
import "../MovieList/MovieList.css";

export default function MovieList() {
  const sliderRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="trending-now">
      <div className="container">
        <h2>Trending Now</h2>
        <div className="slider-container">
          <button className="slider-btn left" onClick={scrollLeft}>
            ‹
          </button>

          <div className="slider" ref={sliderRef}>
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => setSelectedMovie(movie)}
              >
                <img src={movie.image} alt={movie.title} />
              </div>
            ))}
          </div>

          <button className="slider-btn right" onClick={scrollRight}>
            ›
          </button>
        </div>
      </div>
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal modal-dialog modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="movie-details">
            <div className="close-btn">
            <button onClick={() => setSelectedMovie(null)}>X</button>
            </div>
            <div className="movie-image">
            <img src={selectedMovie.image} alt={selectedMovie.title} />
            </div>  
            <h3>{selectedMovie.title}</h3>
            <p>
              {selectedMovie.year} | {selectedMovie.rating} |{" "}
              {selectedMovie.type}
            </p>
            <p>{selectedMovie.genres.join(", ")}</p>
            <p>{selectedMovie.description}</p>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
