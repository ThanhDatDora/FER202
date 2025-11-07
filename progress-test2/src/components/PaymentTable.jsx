import React, { useState } from 'react';
import { Table, Card, Alert, Spinner, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../services/api';
import './PaymentTable.css'; // Import CSS file for custom styles

const PaymentTable = () => {
    const { filteredPayments, loading, error, deletePayment } = usePayment();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    
    // Tính tổng số tiền
    const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
    
    // Handle actions
    const handleViewDetails = (payment) => {
        navigate(`/payment-details/${payment.id}`);
    };

    const handleEdit = (payment) => {
        navigate(`/edit-payment/${payment.id}`);
    };

    const handleDeleteClick = (payment) => {
        setPaymentToDelete(payment);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (paymentToDelete) {
            setDeleting(true);
            const result = await deletePayment(paymentToDelete.id);
            setDeleting(false);
            
            if (result.success) {
                setShowDeleteModal(false);
                setPaymentToDelete(null);
            } else {
                alert('Error deleting payment: ' + result.error);
            }
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setPaymentToDelete(null);
    };

    if (loading) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Payment List</Card.Header>
                <Card.Body className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-2">Loading payments...</p>
                </Card.Body>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Payment List</Card.Header>
                <Card.Body>
                    <Alert variant="danger">
                        Error loading payments: {error}
                    </Alert>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                    <span>Payment List ({filteredPayments.length} payments)</span>
                    <Button 
                        variant="success" 
                        onClick={() => navigate('/add-payment')}
                    >
                        Add New Payment
                    </Button>
                </Card.Header>
                <Card.Body>
                    {filteredPayments.length === 0 ? (
                        <Alert variant="info">
                            No payments found matching your criteria.
                        </Alert>
                    ) : (
                        <>
                            <Table striped bordered hover responsive className="payment-table">
                                <thead className="table-header">
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>Semester</th>
                                        <th>Course Name</th>
                                        <th>Amount</th>
                                        <th className="text-center">Date</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((payment, index) => (
                                        <tr key={payment.id} className="payment-row">
                                            <td className="text-center text-muted">{index + 1}</td>
                                            <td className="fw-medium">{payment.semester}</td>
                                            <td className="course-name">{payment.courseName}</td>
                                            <td>{formatCurrency(payment.amount)}</td>
                                            <td className="text-center date-cell">{formatDate(payment.date)}</td>
                                            <td className="text-center action-column">
                                                <div className="action-buttons">
                                                    <Button 
                                                        variant="outline-info" 
                                                        size="sm"
                                                        className="action-btn view-btn me-1"
                                                        onClick={() => handleViewDetails(payment)}
                                                        title="View Details"
                                                    >
                                                        <i className="fas fa-eye me-1"></i>
                                                        View
                                                    </Button>
                                                    <Button 
                                                        variant="outline-warning" 
                                                        size="sm"
                                                        className="action-btn edit-btn me-1"
                                                        onClick={() => handleEdit(payment)}
                                                        title="Edit Payment"
                                                    >
                                                        <i className="fas fa-edit me-1"></i>
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        variant="outline-danger" 
                                                        size="sm"
                                                        className="action-btn delete-btn"
                                                        onClick={() => handleDeleteClick(payment)}
                                                        title="Delete Payment"
                                                    >
                                                        <i className="fas fa-trash me-1"></i>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            
                            {/* Total Amount */}
                            <div className="d-flex justify-content-end mt-3">
                                <Card className="border-primary" style={{ width: '300px' }}>
                                    <Card.Body>
                                        <h5 className="text-primary mb-0">
                                            Total Amount: {formatCurrency(totalAmount)}
                                        </h5>
                                    </Card.Body>
                                </Card>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
            
            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the payment for "{paymentToDelete?.courseName}" in {paymentToDelete?.semester}?
                    <br />
                    <strong>Amount: {paymentToDelete && formatCurrency(paymentToDelete.amount)}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
                        {deleting ? (
                            <>
                                <Spinner size="sm" animation="border" className="me-2" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PaymentTable;
