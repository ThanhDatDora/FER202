import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import HomeCarousel from "../components/home/HomeCarousel";
import MovieCard from "../movies/MovieCard";
import Filter from "../components/filter/Filter";
import { movies } from "../data/movies/movies";

export default function HomePage({ quickSearch = "" }) {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const applyFilter = ({ search = "", yearRange = "all", sort = "none" }) => {
    let result = [...movies];

    // Search (title + description)
    if (search) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }

    // Year range
    if (yearRange === "<=2000") result = result.filter((m) => m.year <= 2000);
    else if (yearRange === "2001-2015")
      result = result.filter((m) => m.year >= 2001 && m.year <= 2015);
    else if (yearRange === ">2015") result = result.filter((m) => m.year > 2015);

    // Sorting
    if (sort === "year-asc") result.sort((a, b) => a.year - b.year);
    if (sort === "year-desc") result.sort((a, b) => b.year - a.year);
    if (sort === "title-asc") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "title-desc") result.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "duration-asc") result.sort((a, b) => a.duration - b.duration);
    if (sort === "duration-desc") result.sort((a, b) => b.duration - a.duration);

    setFilteredMovies(result);
  };

  const handleFilterChange = (payload) => applyFilter(payload);

  const handleAddFavourite = (movie) => {
    const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
    if (!favs.some((m) => m.id === movie.id)) {
      localStorage.setItem("favourites", JSON.stringify([...favs, movie]));
    }
    setToastMsg("Added to favourites!");
    setShowToast(true);
  };

  const handleViewDetails = (movie) => setSelectedMovie(movie);

  // Nhận quickSearch từ NavBar (ở App) để lọc ngay
  useEffect(() => {
    if (quickSearch !== "") {
      applyFilter({ search: quickSearch, yearRange: "all", sort: "none" });
    }
  }, [quickSearch]);

  return (
    <div>
      <HomeCarousel />

      <div className="container mt-4">
        <Filter onFilterChange={handleFilterChange} />

        <h2 className="mb-3">Featured Movies Collections</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredMovies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                onAddFavourite={handleAddFavourite}
                onViewDetails={handleViewDetails}
              />
            </Col>
          ))}
        </Row>
      </div>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
        bg="success"
      >
        <Toast.Body className="text-white">{toastMsg}</Toast.Body>
      </Toast>

      <Modal show={!!selectedMovie} onHide={() => setSelectedMovie(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMovie && (
            <>
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="img-fluid rounded mb-3"
              />
              <p>{selectedMovie.description}</p>
              <p><strong>Genre:</strong> {selectedMovie.genre}</p>
              <p><strong>Year:</strong> {selectedMovie.year}</p>
              <p><strong>Country:</strong> {selectedMovie.country}</p>
              <p><strong>Duration:</strong> {selectedMovie.duration} min</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedMovie(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
