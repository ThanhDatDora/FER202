// src/components/MovieTable.jsx
import React, { useState } from 'react';
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

  const [detailMovie, setDetailMovie] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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

  const handleViewClick = (movie) => {
    setDetailMovie(movie);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setDetailMovie(null);
  };

  const renderPoster = (movie, size = 50) => {
    const src =
      movie.avatar ||
      movie.poster ||
      'https://via.placeholder.com/50x50?text=No+Img';
    return (
      <Image
        src={src}
        alt={movie.title}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'cover' }}
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
                  <td className="d-flex gap-2 flex-wrap">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewClick(movie)}
                    >
                      View
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditClick(movie)}
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

      {/* MODAL XÁC NHẬN XÓA */}
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
              Bạn có chắc chắn muốn xóa phim{' '}
              <strong>{movieToDelete.title}</strong> (ID: {movieToDelete.id}) không?
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
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={!movieToDelete}
          >
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL XEM CHI TIẾT */}
      <Modal
        show={showDetailModal}
        onHide={handleCloseDetail}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {detailMovie ? `Chi tiết phim: ${detailMovie.title}` : 'Chi tiết phim'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailMovie ? (
            <div className="d-flex gap-4 flex-wrap">
              <div>
                {renderPoster(detailMovie, 180)}
              </div>
              <div className="flex-grow-1">
                <p><strong>ID:</strong> {detailMovie.id}</p>
                <p><strong>Tên phim:</strong> {detailMovie.title}</p>
                <p><strong>Thể loại:</strong> {genreMap[detailMovie.genreId] || 'Unknown'}</p>
                <p><strong>Thời lượng:</strong> {detailMovie.duration} phút</p>
                <p><strong>Năm:</strong> {detailMovie.year}</p>
                <p><strong>Quốc gia:</strong> {detailMovie.country}</p>
                <p><strong>Mô tả:</strong></p>
                <p>{detailMovie.description}</p>
              </div>
            </div>
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {detailMovie ? (
            <Button
              variant="warning"
              onClick={() => {
                dispatch({ type: 'OPEN_EDIT_MODAL', payload: detailMovie });
                handleCloseDetail();
              }}
            >
              Edit this movie
            </Button>
          ) : null}
          <Button variant="secondary" onClick={handleCloseDetail}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
