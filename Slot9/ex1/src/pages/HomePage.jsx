import React from "react";
import HomeCarousel from "../HomeCarousel.jsx";
import MovieCard from "../components/MovieCard.jsx";
import { movies } from "../data/movies.js";


export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <div className="container py-4">
        <h4 className="mb-3">Featured Movies Collections</h4>
        <div className="row g-4">
          {movies.map(m => (
            <div key={m.id} className="col-12 col-md-6 col-lg-4">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
