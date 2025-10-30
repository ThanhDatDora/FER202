import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';

export default function FilterBar() {
  const { genres, filter } = useMovieState();
  const { dispatch } = useMovieDispatch();

  const handleChange = (name, value) => {
    dispatch({ type: 'SET_FILTER', payload: { [name]: value } });
  };

  return (
    <Row className="mb-4 g-3">
      <Col md={4}>
        <Form.Control
          placeholder="Tìm theo tên phim..."
          value={filter.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </Col>
      <Col md={3}>
        <Form.Select value={filter.genreId} onChange={(e) => handleChange('genreId', e.target.value)}>
          <option value="">Tất cả thể loại</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={filter.duration} onChange={(e) => handleChange('duration', e.target.value)}>
          <option value="">Thời lượng</option>
          <option value="short">≤ 100 phút</option>
          <option value="medium">101 - 130 phút</option>
          <option value="long">&gt; 130 phút</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select value={filter.sort} onChange={(e) => handleChange('sort', e.target.value)}>
          <option value="">Sắp xếp</option>
          <option value="title_asc">Tên phim A → Z</option>
          <option value="title_desc">Tên phim Z → A</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
