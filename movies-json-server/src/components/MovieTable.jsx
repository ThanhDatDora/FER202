// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const {
    filteredMovies,
    genres,
    loading,
    movieToDelete,
    showDeleteModal
  } = useMovieState();

  const { dispatch, confirmDelete } = useMovieDispatch();

  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  const handleConfirmDelete = () => {
    if (!movieToDelete) return;
    confirmDelete(movieToDelete.id);
  };

  const renderPoster = (movie) => {
    const src =
      movie.avatar ||
      movie.poster ||
      'https://via.placeholder.com/50x50?text=No+Img';
    return (
      <Image
        src={src}
        alt={movie.title}
        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        rounded
      />
    );
  };

  if (loading && filteredMovies.length === 0) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" className="me-2" />
        <Alert variant="info" className="mt-3">
          Đang tải dữ liệu phim...
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Poster</th>
            <th>ID</th>
            <th>Tên Phim</th>
            <th>Danh mục</th>
            <th>Thời lượng (phút)</th>
            <th>Năm</th>
            <th>Quốc gia</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-muted">
                Không có phim nào khớp bộ lọc
              </td>
            </tr>
          ) : (
            filteredMovies.map((movie) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td>{renderPoster(movie)}</td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">
                      {movie.description?.slice(0, 60)}
                      {movie.description && movie.description.length > 60
                        ? '...'
                        : ''}
                    </small>
                  </td>
                  <td>{genreName}</td>
                  <td>{movie.duration} phút</td>
                  <td>{movie.year}</td>
                  <td>{movie.country}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditClick(movie)}
                      className="me-2"
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(movie)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      <Modal
        show={showDeleteModal}
        onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieToDelete ? (
            <>
              Bạn có chắc chắn muốn xóa phim
              {' '}<strong>{movieToDelete.title}</strong> (ID: {movieToDelete.id}) không?
            </>
          ) : (
            'Không có phim để xóa.'
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}
          >
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={!movieToDelete}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
