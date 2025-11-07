// src/components/PaymentTable.jsx
import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePayments } from '../contexts/PaymentContext';

export default function PaymentTable() {
  const { items, loading, deletePayment } = usePayments();
  const navigate = useNavigate();

  if (loading) return <Spinner animation="border" role="status" />;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Semester</th>
          <th>Course</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((p) => (
          <tr key={p.id}>
            <td>{p.semester}</td>
            <td>{p.courseName}</td>
            <td>{Number(p.amount || 0).toLocaleString()}</td>
            <td>{p.date || ''}</td>
            <td style={{ display: 'flex', gap: 8 }}>
              <Button size="sm" variant="secondary" onClick={() => navigate(`/payments/${p.id}`)}>
                View Details
              </Button>
              <Button size="sm" variant="warning" onClick={() => navigate(`/payments/${p.id}/edit`)}>
                Edit
              </Button>
              <Button size="sm" variant="danger" onClick={() => deletePayment(p.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
