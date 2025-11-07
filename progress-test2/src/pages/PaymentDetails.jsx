import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Alert, Spinner, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { usePayment } from '../contexts/PaymentContext';
import { formatCurrency } from '../services/api';
import NavigationHeader from '../components/NavigationHeader';

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPaymentById } = usePayment();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date with more details for PaymentDetails
  const formatDetailedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Load payment details
  useEffect(() => {
    const loadPaymentDetails = async () => {
      setLoading(true);
      setError(null);
      
      const result = await getPaymentById(id);
      
      if (result.success) {
        setPayment(result.payment);
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    };

    if (id) {
      loadPaymentDetails();
    }
  }, [id, getPaymentById]);

  const handleEdit = () => {
    navigate(`/edit-payment/${id}`);
  };

  const handleBack = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <Card>
            <Card.Body className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading payment details...</p>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <Card>
            <Card.Body>
              <Alert variant="danger">
                Error loading payment details: {error}
              </Alert>
              <Button variant="secondary" onClick={handleBack}>
                Back to Payment List
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  if (!payment) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <Card>
            <Card.Body>
              <Alert variant="warning">
                Payment not found.
              </Alert>
              <Button variant="secondary" onClick={handleBack}>
                Back to Payment List
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Payment Details</h4>
                <Badge bg="success">Payment ID: {payment.id}</Badge>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="mb-4">
                      <h6 className="text-muted mb-2">SEMESTER</h6>
                      <p className="h5">{payment.semester}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <h6 className="text-muted mb-2">COURSE NAME</h6>
                      <p className="h5">{payment.courseName}</p>
                    </div>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <div className="mb-4">
                      <h6 className="text-muted mb-2">AMOUNT</h6>
                      <p className="h4 text-primary">{formatCurrency(payment.amount)}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <h6 className="text-muted mb-2">PAYMENT DATE</h6>
                      <p className="h5">{formatDetailedDate(payment.date)}</p>
                    </div>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <div className="mb-4">
                      <h6 className="text-muted mb-2">USER ID</h6>
                      <p className="h6">#{payment.userId}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <h6 className="text-muted mb-2">STATUS</h6>
                      <Badge bg="success" className="fs-6">Paid</Badge>
                    </div>
                  </Col>
                </Row>

                <hr />
                
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={handleEdit}>
                    Edit Payment
                  </Button>
                  <Button variant="secondary" onClick={handleBack}>
                    Back to List
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentDetails;
