import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const UserFilter = ({ filters, onChange }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <Form className="mb-3">
      <Row>
        <Col md={4} className="mb-2">
          <Form.Control
            placeholder="Search by username or full name"
            name="search"
            value={filters.search || ''}
            onChange={handleInput}
          />
        </Col>
        <Col md={3} className="mb-2">
          <Form.Select name="role" value={filters.role || ''} onChange={handleInput}>
            <option value="">All roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Select>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Select name="status" value={filters.status || ''} onChange={handleInput}>
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
            <option value="locked">Locked</option>
          </Form.Select>
        </Col>
        <Col md={2} className="mb-2">
          <Form.Select name="sortBy" value={filters.sortBy || ''} onChange={handleInput}>
            <option value="">Sort</option>
            <option value="username_asc">Username ↑</option>
            <option value="username_desc">Username ↓</option>
            <option value="status_asc">Status ↑</option>
            <option value="status_desc">Status ↓</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};

export default UserFilter;
