// src/pages/DashboardPage.jsx
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
import { usePayments } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { totalAmount } = usePayments();
  const navigate = useNavigate();

  return (
    <>
      <NavigationHeader />
      <Container>
        <FilterBar />
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Payments</Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div><strong>Total Amount:</strong> {Number(totalAmount).toLocaleString()}</div>
              <Button onClick={() => navigate('/payments/add')}>Add Payment</Button>
            </div>
            <PaymentTable />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DashboardPage;
