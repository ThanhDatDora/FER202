import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AddressForm({ values, onChange, touched }) {
  return (
    <Form>
      <h5 className="mb-3"><i className="bi bi-geo-alt me-2" />Address</h5>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Label>Street</Form.Label>
          <Form.Control name="street" value={values.street} onChange={onChange}
            isInvalid={touched && !values.street} placeholder="123 Main St" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>City</Form.Label>
          <Form.Control name="city" value={values.city} onChange={onChange}
            isInvalid={touched && !values.city} placeholder="Hanoi" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label>Country</Form.Label>
          <Form.Select name="country" value={values.country} onChange={onChange}
            isInvalid={touched && !values.country}>
            <option value="">Select...</option>
            <option>Vietnam</option>
            <option>USA</option>
            <option>UK</option>
            <option>Japan</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control name="zip" value={values.zip} onChange={onChange}
            isInvalid={touched && !values.zip} placeholder="100000" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
    </Form>
  );
}
