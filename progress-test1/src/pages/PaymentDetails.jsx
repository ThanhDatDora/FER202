// src/pages/PaymentDetails.jsx
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../services/api';

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await api.getPaymentById(id);
        if (active) setData(res);
      } catch (e) {
        setErr(e.message || 'Failed to load payment');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  if (err) return <Alert variant="danger">{err}</Alert>;

  if (!data) return null;

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Header as="h5">Payment Details</Card.Header>
            <Card.Body>
              <div className="mb-2"><strong>ID:</strong> {data.id}</div>
              <div className="mb-2"><strong>User ID:</strong> {data.userId}</div>
              <div className="mb-2"><strong>Semester:</strong> {data.semester}</div>
              <div className="mb-2"><strong>Course:</strong> {data.courseName}</div>
              <div className="mb-2"><strong>Amount:</strong> {Number(data.amount || 0).toLocaleString()}</div>
              <div className="mb-2"><strong>Date:</strong> {data.date || ''}</div>
              <div className="mb-2"><strong>Notes:</strong> {data.notes || ''}</div>
              <div className="d-flex gap-2 mt-3">
                <Button onClick={() => navigate(`/payments/${data.id}/edit`)}>Edit</Button>
                <Button variant="secondary" onClick={() => navigate('/home')}>Back</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
