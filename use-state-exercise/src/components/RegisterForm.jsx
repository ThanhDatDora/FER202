import { useState } from "react";
import { Card, Form, Button, Modal, Toast, ToastContainer } from "react-bootstrap";

const init = { username: "", email: "", password: "", confirm: "" };

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

export default function RegisterForm() {
  const [form, setForm] = useState(init);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(form)[name] }));
  };

  const allValid = () => {
    if (!form.username || !form.email || !form.password || !form.confirm) return false;
    return Object.keys(validate(form)).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = validate(form);
    setTouched({ username: true, email: true, password: true, confirm: true });
    setErrors(v);
    if (Object.keys(v).length) return;
    setShowToast(true);
    setShowModal(true);
  };

  const onCancel = () => {
    setForm(init);
    setErrors({});
    setTouched({});
  };

  const mask = (s) => "•".repeat(Math.max(8, s.length || 0));

  return (
    <div style={{ maxWidth: 520, margin: "32px auto" }}>
      <Card>
        <Card.Header>Register</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={onSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={form.username}
                onChange={onChange}
                onBlur={onBlur}
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
                onChange={onChange}
                onBlur={onBlur}
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
                onChange={onChange}
                onBlur={onBlur}
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
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={touched.confirm && !!errors.confirm}
                placeholder="Nhập lại password"
              />
              <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
            </Form.Group>

            <div style={{ display: "flex", gap: 8 }}>
              <Button type="submit" disabled={!allValid()}>Submit</Button>
              <Button variant="outline-secondary" type="button" onClick={onCancel}>Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer position="top-center" className="p-3">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
          <Toast.Header><strong className="me-auto">Register</strong></Toast.Header>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
