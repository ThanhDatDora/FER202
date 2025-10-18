import React, { useReducer } from "react";
import { Form, Button, Card, Container, Row, Col, Modal } from "react-bootstrap";

const initialState = {
  username: "",
  password: "",
  errors: {},
  showModal: false,
};

function validateField(name, value) {
  const v = value.trim();
  if (name === "username") return v === "" ? "Username is required" : "";
  if (name === "password") return v === "" ? "Password is required" : "";
  return "";
}

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE": {
      const { name, value } = action.payload;
      const msg = validateField(name, value);
      const nextErrors = { ...state.errors };
      if (msg) nextErrors[name] = msg; else delete nextErrors[name];
      return { ...state, [name]: value, errors: nextErrors };
    }
    case "SUBMIT": {
      const errs = {};
      const uErr = validateField("username", state.username);
      const pErr = validateField("password", state.password);
      if (uErr) errs.username = uErr;
      if (pErr) errs.password = pErr;
      if (Object.keys(errs).length > 0) return { ...state, errors: errs };
      return { ...state, errors: {}, showModal: true };
    }
    case "CLOSE_MODAL":
      return { ...initialState };
    default:
      return state;
  }
}

export default function LoginForm({ onSubmit }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, errors, showModal } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
    if (onSubmit && username.trim() && password.trim()) {
      onSubmit({ username, password });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) =>
                      dispatch({ type: "CHANGE", payload: { name: "username", value: e.target.value } })
                    }
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) =>
                      dispatch({ type: "CHANGE", payload: { name: "password", value: e.target.value } })
                    }
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => dispatch({ type: "CLOSE_MODAL" })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome, {username}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
