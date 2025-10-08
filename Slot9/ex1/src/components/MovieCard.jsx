import { useMemo, useState } from "react"

function useLocalFavourites(key = "favourites") {
  const read = () => {
    try { return JSON.parse(localStorage.getItem(key)) || [] } catch { return [] }
  }
  const write = (arr) => localStorage.setItem(key, JSON.stringify(arr))
  return { read, write }
}

export default function MovieCard({ movie }) {
  const { read, write } = useLocalFavourites()
  const [showToast, setShowToast] = useState(false)
  const [open, setOpen] = useState(false)

  const shortDesc = useMemo(() => {
    const t = movie.description || ""
    return t.length > 140 ? t.slice(0, 140) + "…" : t
  }, [movie.description])

  const addToFavourites = () => {
    const list = read()
    if (!list.includes(movie.id)) {
      const next = [...list, movie.id]
      write(next)
    }
    setShowToast(true)
    setTimeout(() => setShowToast(false), 1800)
  }

  return (
    <>
      <div className="card h-100 shadow-sm border-0">
        <img
          src={movie.poster}
          className="card-img-top"
          alt={`${movie.title} poster`}
          style={{ aspectRatio: "2/3", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{movie.title}</h5>
          <p className="text-secondary small mb-2">{movie.year} • {movie.country} • {movie.duration} min</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {movie.genre?.map(g => (
              <span key={g} className="badge text-bg-dark">{g}</span>
            ))}
          </div>
          <p className="card-text flex-grow-1">{shortDesc}</p>
          <div className="d-flex gap-2 mt-3">
            <button type="button" className="btn btn-outline-primary w-50" onClick={addToFavourites}>
              Add to Favourites
            </button>
            <button type="button" className="btn btn-primary w-50" onClick={() => setOpen(true)}>
              View Details
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 1080 }}
        >
          <div className="toast-header">
            <strong className="me-auto">Favourites</strong>
            <small>Now</small>
            <button type="button" className="btn-close ms-2 mb-1" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">Added to favourites!</div>
        </div>
      )}

      {open && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{movie.title}</h5>
                <button type="button" className="btn-close" onClick={() => setOpen(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <img src={movie.poster} alt={`${movie.title} poster`} className="img-fluid rounded" />
                  </div>
                  <div className="col-12 col-md-8">
                    <p className="mb-2">{movie.description}</p>
                    <p className="text-secondary mb-2">{movie.year} • {movie.country} • {movie.duration} min</p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {movie.genre?.map(g => (
                        <span key={g} className="badge text-bg-dark">{g}</span>
                      ))}
                    </div>
                    <h6 className="mb-2">Showtimes</h6>
                    <ul className="list-unstyled mb-0">
                      {movie.showtimes?.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={addToFavourites}>Add to Favourites</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
