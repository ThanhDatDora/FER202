import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
  formData: {
    semester: '',
    courseName: '',
    amount: '',
    date: '',
  },
  errors: {},
  isSubmitting: false,
};

// 2. Định nghĩa reducer cho form 
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.value,
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

const AddPayment = () => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { addPayment } = usePayment();
  const { user } = useAuth();

  // Validation form
  const validateForm = () => {
    const errors = {};
    const { semester, courseName, amount, date } = formState.formData;

    if (!semester.trim()) {
      errors.semester = 'Semester is required.';
    }

    if (!courseName.trim()) {
      errors.courseName = 'Course name is required.';
    }

    if (!amount.trim()) {
      errors.amount = 'Amount is required.';
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      errors.amount = 'Amount must be a valid positive number.';
    }

    if (!date.trim()) {
      errors.date = 'Date is required.';
    }

    return errors;
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });

    // Clear specific field error khi user nhập
    if (formState.errors[name]) {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', value: true });

    try {
      const paymentData = {
        ...formState.formData,
        amount: parseFloat(formState.formData.amount),
        userId: user.id,
      };

      const result = await addPayment(paymentData);

      if (result.success) {
        // Thành công, chuyển về trang home
        navigate('/home');
      } else {
        // Hiển thị lỗi
        alert('Error adding payment: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred.');
    } finally {
      dispatch({ type: 'SET_SUBMITTING', value: false });
    }
  };

  // Xử lý reset form
  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <Card>
              <Card.Header>
                <h3 className="text-center mb-0">Add New Payment</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                  {/* Semester Field */}
                  <Form.Group controlId="semester" className="mb-3">
                    <Form.Label>Semester *</Form.Label>
                    <Form.Control
                      type="text"
                      name="semester"
                      value={formState.formData.semester}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.semester}
                      placeholder="e.g., Fall 2025, Spring 2026"
                      disabled={formState.isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.semester}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Course Name Field */}
                  <Form.Group controlId="courseName" className="mb-3">
                    <Form.Label>Course Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="courseName"
                      value={formState.formData.courseName}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.courseName}
                      placeholder="e.g., Web Development, Database Systems"
                      disabled={formState.isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.courseName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Amount Field */}
                  <Form.Group controlId="amount" className="mb-3">
                    <Form.Label>Amount (VND) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={formState.formData.amount}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.amount}
                      placeholder="e.g., 3500000"
                      disabled={formState.isSubmitting}
                      min="0"
                      step="1000"
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Date Field */}
                  <Form.Group controlId="date" className="mb-3">
                    <Form.Label>Payment Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formState.formData.date}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.date}
                      disabled={formState.isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.date}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={formState.isSubmitting}
                      className="flex-fill"
                    >
                      {formState.isSubmitting ? (
                        <>
                          <Spinner size="sm" animation="border" role="status" className="me-2" />
                          Adding...
                        </>
                      ) : (
                        'Add Payment'
                      )}
                    </Button>
                    <Button 
                      variant="secondary" 
                      type="button" 
                      onClick={handleReset}
                      disabled={formState.isSubmitting}
                    >
                      Reset
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      type="button" 
                      onClick={handleCancel}
                      disabled={formState.isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddPayment;
