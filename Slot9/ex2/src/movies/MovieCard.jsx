import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.css";

export default function MovieCard({
  movie,
  img,
  title,
  text,
  genre,
  year,
  country,
  duration,
  onAddFavourite,
  onViewDetails,
}) {
  const m = movie || {
    poster: img,
    title,
    description: text,
    genre,
    year,
    country,
    duration,
  };

  const shortDesc =
    m?.description && m.description.length > 80
      ? m.description.slice(0, 80) + "..."
      : m?.description || "";

  const handleDetails = () => {
    if (onViewDetails) onViewDetails(m);
  };

  const handleFavourite = () => {
    if (onAddFavourite) onAddFavourite(m);
  };

  return (
    <Card className="movie-card shadow-sm h-100">
      <Card.Img variant="top" src={m?.poster} alt={m?.title || "Poster"} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{m?.title}</Card.Title>
        <Card.Text>{shortDesc}</Card.Text>

        <div className="mb-2">
          <Badge bg="info">{m?.genre}</Badge>
        </div>

        <p className="small text-muted mb-1">
          <strong>Year:</strong> {m?.year} | <strong>Country:</strong> {m?.country}
        </p>
        <p className="small text-muted">
          <strong>Duration:</strong> {m?.duration} min
        </p>

        <div className="mt-auto d-flex justify-content-between">
          <Button variant="primary" onClick={handleDetails}>
            Details
          </Button>
          <Button variant="outline-warning" size="sm" onClick={handleFavourite}>
            Add to Favourites
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
