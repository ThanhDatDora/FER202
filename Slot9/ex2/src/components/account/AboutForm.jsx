import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

export default function AboutForm({ values, onChange, touched }) {
  return (
    <Form>
      <h5 className="mb-3"><i className="bi bi-person-circle me-2" />About</h5>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" value={values.firstName} onChange={onChange}
            isInvalid={touched && !values.firstName} placeholder="John" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="lastName" value={values.lastName} onChange={onChange}
            isInvalid={touched && !values.lastName} placeholder="Doe" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={values.email} onChange={onChange}
            isInvalid={touched && !values.email} placeholder="john@example.com" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label>Phone</Form.Label>
          <Form.Control name="phone" value={values.phone} onChange={onChange}
            isInvalid={touched && !values.phone} placeholder="0123 456 789" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" min={1} name="age" value={values.age} onChange={onChange}
            isInvalid={touched && !values.age} placeholder="20" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label>Avatar</Form.Label>
          <InputGroup>
            <InputGroup.Text><i className="bi bi-image" /></InputGroup.Text>
            <Form.Control type="file" name="avatar" onChange={onChange}
              isInvalid={touched && !values.avatar} />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}
