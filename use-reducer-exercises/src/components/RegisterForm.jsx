import React, { useReducer } from "react";
import { Card, Form, Button, Modal, Toast, ToastContainer } from "react-bootstrap";

const initForm = { username: "", email: "", password: "", confirm: "" };

const validate = (v) => {
  const e = {};
  const u = v.username.trim();
  if (u.length < 3) e.username = "Username phải ≥ 3 ký tự";
  else if (!/^[A-Za-z0-9._]+$/.test(u)) e.username = "Chỉ gồm chữ, số, _ hoặc .";
  else if (u !== v.username) e.username = "Không có khoảng trắng ở đầu/cuối";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Email không hợp lệ";
  if (v.password.length < 8) e.password = "Password phải ≥ 8 ký tự";
  else if (!/[A-Z]/.test(v.password)) e.password = "Cần có chữ hoa";
  else if (!/[a-z]/.test(v.password)) e.password = "Cần có chữ thường";
  else if (!/[0-9]/.test(v.password)) e.password = "Cần có chữ số";
  else if (!/[^\w\s]/.test(v.password)) e.password = "Cần có ký tự đặc biệt";
  if (v.confirm !== v.password) e.confirm = "Confirm không khớp password";
  return e;
};

const allValid = (form) =>
  form.username && form.email && form.password && form.confirm && Object.keys(validate(form)).length === 0;

const initialState = {
  form: initForm,
  errors: {},
  touched: {},
  showToast: false,
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE": {
      const { name, value } = action.payload;
      const nextForm = { ...state.form, [name]: value };
      const fieldErr = validate(nextForm)[name];
      const nextErrors = { ...state.errors };
      if (fieldErr) nextErrors[name] = fieldErr; else delete nextErrors[name];
      return { ...state, form: nextForm, errors: nextErrors };
    }
    case "BLUR": {
      const { name } = action.payload;
      const msg = validate(state.form)[name];
      const nextErrors = { ...state.errors };
      if (msg) nextErrors[name] = msg; else delete nextErrors[name];
      return { ...state, touched: { ...state.touched, [name]: true }, errors: nextErrors };
    }
    case "SUBMIT": {
      const v = validate(state.form);
      const nextTouched = { username: true, email: true, password: true, confirm: true };
      if (Object.keys(v).length) return { ...state, touched: nextTouched, errors: v };
      return { ...state, touched: nextTouched, errors: {}, showToast: true, showModal: true };
    }
    case "CANCEL":
      return { ...initialState };
    case "CLOSE_TOAST":
      return { ...state, showToast: false };
    case "CLOSE_MODAL":
      return { ...state, showModal: false };
    default:
      return state;
  }
}

export default function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors, touched, showToast, showModal } = state;

  const mask = (s) => "•".repeat(Math.max(8, s.length || 0));

  return (
    <div style={{ maxWidth: 520, margin: "32px auto" }}>
      <Card>
        <Card.Header>Register</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={(e) => { e.preventDefault(); dispatch({ type: "SUBMIT" }); }}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={form.username}
                onChange={(e) => dispatch({ type: "CHANGE", payload: { name: "username", value: e.target.value } })}
                onBlur={(e) => dispatch({ type: "BLUR", payload: { name: e.target.name } })}
                isInvalid={touched.username && !!errors.username}
                placeholder="vd: dora.thanh_dat"
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => dispatch({ type: "CHANGE", payload: { name: "email", value: e.target.value } })}
                onBlur={(e) => dispatch({ type: "BLUR", payload: { name: e.target.name } })}
                isInvalid={touched.email && !!errors.email}
                placeholder="name@example.com"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => dispatch({ type: "CHANGE", payload: { name: "password", value: e.target.value } })}
                onBlur={(e) => dispatch({ type: "BLUR", payload: { name: e.target.name } })}
                isInvalid={touched.password && !!errors.password}
                placeholder="Tối thiểu 8 ký tự, có hoa/thường/số/ký tự đặc biệt"
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirm" className="mb-4">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={(e) => dispatch({ type: "CHANGE", payload: { name: "confirm", value: e.target.value } })}
                onBlur={(e) => dispatch({ type: "BLUR", payload: { name: e.target.name } })}
                isInvalid={touched.confirm && !!errors.confirm}
                placeholder="Nhập lại password"
              />
              <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
            </Form.Group>

            <div style={{ display: "flex", gap: 8 }}>
              <Button type="submit" disabled={!allValid(form)}>Submit</Button>
              <Button variant="outline-secondary" type="button" onClick={() => dispatch({ type: "CANCEL" })}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer position="top-center" className="p-3">
        <Toast bg="success" onClose={() => dispatch({ type: "CLOSE_TOAST" })} show={showToast} delay={2000} autohide>
          <Toast.Header><strong className="me-auto">Register</strong></Toast.Header>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => dispatch({ type: "CLOSE_MODAL" })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="border-0">
            <Card.Body>
              <div>Username: <strong>{form.username.trim()}</strong></div>
              <div>Email: <strong>{form.email}</strong></div>
              <div>Password: <code>{mask(form.password)}</code></div>
              <div>Confirm: <code>{mask(form.confirm)}</code></div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
