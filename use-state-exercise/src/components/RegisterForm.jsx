import { useMemo, useState } from "react";
import {
  Container, Row, Col, Card, Form, Button, InputGroup,
  Modal, Toast, ToastContainer, Badge
} from "react-bootstrap";

const initialUser = { username: "", email: "", password: "", confirm: "" };

const validators = {
  username: (v) => {
    const t = v.trim();
    if (t.length < 3) return "Username phải ≥ 3 ký tự";
    if (!/^[A-Za-z0-9._]+$/.test(t)) return "Chỉ gồm chữ, số, _ hoặc .";
    if (t !== v) return "Không có khoảng trắng ở đầu/cuối";
    return "";
  },
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Email không hợp lệ"),
  password: (v) => {
    if (v.length < 8) return "Password phải ≥ 8 ký tự";
    if (!/[A-Z]/.test(v)) return "Cần có chữ hoa";
    if (!/[a-z]/.test(v)) return "Cần có chữ thường";
    if (!/[0-9]/.test(v)) return "Cần có chữ số";
    if (!/[^\w\s]/.test(v)) return "Cần có ký tự đặc biệt";
    return "";
  },
  confirm: (_v, all) => (all.confirm === all.password ? "" : "Confirm không khớp password"),
};

export default function RegisterForm() {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validateField = (name, value, nextState) => {
    const all = { ...nextState, [name]: value };
    const fn = validators[name];
    return fn ? fn(value, all) : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...user, [name]: value };
    setUser(next);
    const msg = validateField(name, value, next);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const msg = validateField(name, user[name], user);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  const allErrors = useMemo(() => {
    const m = {};
    Object.keys(validators).forEach((k) => {
      const msg = validators[k](user[k], user);
      if (msg) m[k] = msg;
    });
    return m;
  }, [user]);

  const canSubmit =
    user.username &&
    user.email &&
    user.password &&
    user.confirm &&
    Object.keys(allErrors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true, confirm: true });
    setErrors(allErrors);
    if (!canSubmit) return;
    setShowToast(true);
    setShowModal(true);
  };

  const handleCancel = () => {
    setUser(initialUser);
    setErrors({});
    setTouched({});
  };

  const maskPwd = (v) => "•".repeat(Math.max(8, v.length || 0));

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center">
        <Col md={7} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <span className="fw-semibold">Register</span>
              <Badge bg={canSubmit ? "success" : "secondary"}>
                {canSubmit ? "Valid" : "Invalid"}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && !!(errors.username || allErrors.username)}
                    placeholder="vd: dora.thanh_dat"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username || allErrors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!(errors.email || allErrors.email)}
                    placeholder="name@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email || allErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!(errors.password || allErrors.password)}
                      placeholder="Tối thiểu 8 ký tự, có hoa/thường/số/ký tự đặc biệt"
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {errors.password || allErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirm">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={user.confirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirm && !!(errors.confirm || allErrors.confirm)}
                    placeholder="Nhập lại password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm || allErrors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" disabled={!canSubmit}>
                    Submit
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
              <div className="mb-2"><span className="text-muted">Username:</span> <strong>{user.username.trim()}</strong></div>
              <div className="mb-2"><span className="text-muted">Email:</span> <strong>{user.email}</strong></div>
              <div className="mb-2"><span className="text-muted">Password:</span> <code>{maskPwd(user.password)}</code></div>
              <div className="mb-0"><span className="text-muted">Confirm:</span> <code>{maskPwd(user.confirm)}</code></div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
