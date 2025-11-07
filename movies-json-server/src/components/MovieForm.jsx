// src/components/MovieForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

// Component con tái sử dụng cho các trường input
const MovieFields = ({
  currentMovie,
  handleInputChange,
  handleFileChange,
  imagePreview,
  genres,
  errors = {},
  validated = false,
}) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh Avatar Phim</Form.Label>
          <Form.Control
            type="file"
            name="avatarFile"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />
          <Form.Control
            type="text"
            name="avatar"
            value={currentMovie.avatar || ''}
            onChange={handleInputChange}
            placeholder="Hoặc nhập URL hình ảnh"
            isInvalid={validated && errors.avatar}
          />
          <Form.Control.Feedback type="invalid">
            {errors.avatar}
          </Form.Control.Feedback>
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                thumbnail
                style={{ maxWidth: '200px', maxHeight: '150px' }}
              />
            </div>
          )}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formTitle">
          <Form.Label>
            Tên Phim <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={currentMovie.title || ''}
            onChange={handleInputChange}
            placeholder="Tên phim"
            required
            isInvalid={validated && errors.title}
            isValid={validated && !errors.title && currentMovie.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md={12}>
        <Form.Group controlId="formDescription">
          <Form.Label>
            Mô tả <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={currentMovie.description || ''}
            onChange={handleInputChange}
            placeholder="Mô tả phim"
            required
            isInvalid={validated && errors.description}
            isValid={validated && !errors.description && currentMovie.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formGenre">
          <Form.Label>
            Thể loại <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="genreId"
            value={currentMovie.genreId || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.genreId}
            isValid={validated && !errors.genreId && currentMovie.genreId}
          >
            <option value="">Chọn thể loại</option>
            {(genres || []).map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.genreId}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>
            Thời lượng (phút) <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={currentMovie.duration || ''}
            onChange={handleInputChange}
            placeholder="Phút"
            required
            min="1"
            max="600"
            isInvalid={validated && errors.duration}
            isValid={validated && !errors.duration && currentMovie.duration}
          />
          <Form.Control.Feedback type="invalid">
            {errors.duration}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group controlId="formYear">
          <Form.Label>
            Năm <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={currentMovie.year || ''}
            onChange={handleInputChange}
            placeholder="Năm"
            required
            min="1900"
            max="2030"
            isInvalid={validated && errors.year}
            isValid={validated && !errors.year && currentMovie.year}
          />
          <Form.Control.Feedback type="invalid">
            {errors.year}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group controlId="formCountry">
          <Form.Label>
            Quốc gia <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={currentMovie.country || ''}
            onChange={handleInputChange}
            placeholder="Quốc gia"
            required
            isInvalid={validated && errors.country}
            isValid={validated && !errors.country && currentMovie.country}
          />
          <Form.Control.Feedback type="invalid">
            {errors.country}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal, genres } = state;

  // state dành cho form thêm mới
  const [createImagePreview, setCreateImagePreview] = useState('');
  const [createValidated, setCreateValidated] = useState(false);
  const [createErrors, setCreateErrors] = useState({});

  // state dành cho modal sửa
  const [editImagePreview, setEditImagePreview] = useState('');
  const [editValidated, setEditValidated] = useState(false);
  const [editErrors, setEditErrors] = useState({});

  // Khi mở modal sửa, lấy luôn ảnh để preview
  useEffect(() => {
    if (showEditModal && currentMovie?.avatar) {
      setEditImagePreview(currentMovie.avatar);
    } else if (showEditModal && currentMovie?.poster) {
      setEditImagePreview(currentMovie.poster);
    } else if (!showEditModal) {
      setEditImagePreview('');
      setEditValidated(false);
      setEditErrors({});
    }
  }, [showEditModal, currentMovie]);

  // validate chung
  const runValidate = (movie) => {
    const newErrors = {};

    if (!movie.title?.trim()) newErrors.title = 'Tên phim không được để trống';
    else if (movie.title.length < 2) newErrors.title = 'Tên phim phải có ít nhất 2 ký tự';

    if (!movie.description?.trim()) newErrors.description = 'Mô tả không được để trống';
    else if (movie.description.length < 10) newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';

    if (!movie.genreId) newErrors.genreId = 'Vui lòng chọn thể loại';

    if (!movie.duration) newErrors.duration = 'Thời lượng không được để trống';
    else if (movie.duration < 1 || movie.duration > 600)
      newErrors.duration = 'Thời lượng phải từ 1 đến 600 phút';

    if (!movie.year) newErrors.year = 'Năm không được để trống';
    else if (movie.year < 1900 || movie.year > 2030)
      newErrors.year = 'Năm phải từ 1900 đến 2030';

    if (!movie.country?.trim()) newErrors.country = 'Quốc gia không được để trống';

    if (!movie.avatar?.trim()) newErrors.avatar = 'Vui lòng chọn ảnh hoặc nhập URL';

    return newErrors;
  };

  // ================== FORM THÊM MỚI ==================
  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    // cập nhật vào currentMovie trong context
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
    if (createErrors[name]) {
      setCreateErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCreateFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setCreateImagePreview(imageUrl);
      dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: imageUrl } });
    };
    reader.readAsDataURL(file);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCreateValidated(true);

    const errors = runValidate(currentMovie);
    if (Object.keys(errors).length > 0) {
      setCreateErrors(errors);
      return;
    }

    const dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration || 0, 10),
      year: parseInt(currentMovie.year || 0, 10),
      genreId: parseInt(currentMovie.genreId || 1, 10),
    };

    const success = await handleCreateOrUpdate(dataToSend, false, null);

    if (success) {
      // reset form
      dispatch({ type: 'RESET_FORM' });
      setCreateImagePreview('');
      setCreateValidated(false);
      setCreateErrors({});
    }
  };

  // ================== MODAL SỬA ==================
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
    if (editErrors[name]) {
      setEditErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setEditImagePreview(imageUrl);
      dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: imageUrl } });
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEditValidated(true);

    const errors = runValidate(currentMovie);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    const dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration || 0, 10),
      year: parseInt(currentMovie.year || 0, 10),
      genreId: parseInt(currentMovie.genreId || 1, 10),
    };

    const success = await handleCreateOrUpdate(dataToSend, true, currentMovie.id);

    if (success) {
      handleCloseEditModal();
    }
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
    setEditImagePreview('');
    setEditValidated(false);
    setEditErrors({});
  };

  return (
    <>
      {/* FORM THÊM MỚI (Luôn hiển thị) */}
      <Container className="p-3 mb-4 border">
        <h3 className="mb-3">📽️ Thêm Phim Mới</h3>
        <Form noValidate validated={createValidated} onSubmit={handleCreateSubmit}>
          <MovieFields
            currentMovie={currentMovie}
            handleInputChange={handleCreateInputChange}
            handleFileChange={handleCreateFileChange}
            imagePreview={createImagePreview}
            genres={genres}
            errors={createErrors}
            validated={createValidated}
          />
          <div className="d-flex gap-2 mt-3">
            <Button variant="success" type="submit">
              ➕ Thêm Phim
            </Button>
          </div>
        </Form>
      </Container>

      {/* MODAL CHỈNH SỬA (Chỉ hiện khi showEditModal là true) */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={editValidated} onSubmit={handleEditSubmit}>
          <Modal.Body>
            <MovieFields
              currentMovie={currentMovie}
              handleInputChange={handleEditInputChange}
              handleFileChange={handleEditFileChange}
              imagePreview={editImagePreview || currentMovie.avatar}
              genres={genres}
              errors={editErrors}
              validated={editValidated}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Hủy
            </Button>
            <Button variant="warning" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
