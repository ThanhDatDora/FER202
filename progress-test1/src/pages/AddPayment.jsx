// src/pages/AddPayment.jsx
import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { usePayments } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

export default function AddPayment() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addPayment, updatePayment } = usePayments();
  const { user } = useAuth();

  const [form, setForm] = useState({
    userId: user?.id || '', // bám db.json
    semester: '',
    courseName: '',
    amount: '',
    date: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!isEdit) return;
      setLoading(true);
      try {
        const data = await api.getPaymentById(id);
        if (active)
          setForm({
            userId: data.userId || user?.id || '',
            semester: data.semester || '',
            courseName: data.courseName || '',
            amount: data.amount ?? '',
            date: data.date || '',
            notes: data.notes || '',
          });
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
  }, [id, isEdit, user?.id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!form.semester || !form.courseName || form.amount === '') {
      setErr('Please fill required fields: semester, course name, amount');
      return;
    }
    try {
      const payload = { ...form, amount: Number(form.amount) };
      if (isEdit) {
        await updatePayment(id, payload);
      } else {
        await addPayment(payload);
      }
      navigate('/home');
    } catch (e) {
      setErr(e.message || 'Save failed');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Header as="h5">{isEdit ? 'Edit Payment' : 'Add Payment'}</Card.Header>
            <Card.Body>
              {err && <Alert variant="danger" className="mb-3">{err}</Alert>}
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <Form onSubmit={onSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Semester</Form.Label>
                        <Form.Control name="semester" value={form.semester} onChange={onChange} placeholder="Fall 2025" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Course</Form.Label>
                        <Form.Control name="courseName" value={form.courseName} onChange={onChange} placeholder="Web Development" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" name="amount" value={form.amount} onChange={onChange} placeholder="3500000" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={form.date} onChange={onChange} />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} name="notes" value={form.notes} onChange={onChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex gap-2 mt-3">
                    <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                    <Button variant="secondary" onClick={() => navigate('/home')}>Cancel</Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
