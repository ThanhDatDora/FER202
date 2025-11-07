import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

export default function LoginPage() {
  const { login, loading, errors, clearErrors } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // khi user gõ lại thì xoá lỗi cũ
    if (errors?.email || errors?.password || errors?.global) {
      clearErrors?.();
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form.email, form.password);
    if (ok) {
      // tuỳ bạn, ở bài movie thì là /movies
      navigate("/movies");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ minWidth: 360, maxWidth: 420 }}>
        <Card.Body>
          <h3 className="mb-4 text-center">Đăng nhập</h3>

          {/* lỗi chung (sai email/mật khẩu, server down...) */}
          {errors?.global ? <Alert variant="danger">{errors.global}</Alert> : null}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors?.email}
                placeholder="viewer@example.com"
                autoComplete="username"
              />
              <Form.Control.Feedback type="invalid">
                {errors?.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                isInvalid={!!errors?.password}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <Form.Control.Feedback type="invalid">
                {errors?.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
