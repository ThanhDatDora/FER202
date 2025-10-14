import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

export default function AccountForm({ values, onChange, touched }) {
  const pwdMismatch = touched && values.password && values.confirm && values.password !== values.confirm;

  return (
    <Form>
      <h5 className="mb-3"><i className="bi bi-lock me-2" />Account</h5>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Text><i className="bi bi-person" /></InputGroup.Text>
            <Form.Control name="username" value={values.username} onChange={onChange}
              isInvalid={touched && !values.username} placeholder="johndoe" />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Label>Secret Question</Form.Label>
          <Form.Control name="question" value={values.question} onChange={onChange}
            isInvalid={touched && !values.question} placeholder="Your first pet's name?" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text><i className="bi bi-shield-lock" /></InputGroup.Text>
            <Form.Control type="password" name="password" value={values.password} onChange={onChange}
              isInvalid={touched && !values.password} placeholder="••••••••" />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <InputGroup.Text><i className="bi bi-shield-lock" /></InputGroup.Text>
            <Form.Control type="password" name="confirm" value={values.confirm} onChange={onChange}
              isInvalid={touched && (!values.confirm || pwdMismatch)} placeholder="••••••••" />
            <Form.Control.Feedback type="invalid">
              {pwdMismatch ? "Passwords do not match" : "Required"}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Form.Label>Answer</Form.Label>
          <Form.Control name="answer" value={values.answer} onChange={onChange}
            isInvalid={touched && !values.answer} placeholder="Fluffy" />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Col>
      </Row>
    </Form>
  );
}
