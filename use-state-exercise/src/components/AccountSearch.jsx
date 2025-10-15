import { useState, useMemo } from "react";
import { Container, Row, Col, Card, Form, InputGroup, Button, Alert, Badge } from "react-bootstrap";

const accounts = [
  { id: 1, username: "alice", password: "alice123", avatar: "./images/alice.jpg" },
  { id: 2, username: "bob", password: "bob123", avatar: "./images/bob.jpeg" },
  { id: 3, username: "charlie", password: "charlie123", avatar: "./images/charlie.jpg" },
  { id: 4, username: "dora", password: "dora123", avatar: "./images/dora.jpg" },
  { id: 5, username: "evan", password: "evan123", avatar: "./images/chup-chan-dung-4.jpg" },
];

export default function AccountSearch() {
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return accounts;
    return accounts.filter(a => a.username.toLowerCase().includes(q));
  }, [term]);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Tìm kiếm Account theo Username</h2>

      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Nhập username cần tìm..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={() => setTerm("")}>Clear</Button>
      </InputGroup>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>Kết quả: <Badge bg="primary">{filtered.length}</Badge></div>
        <div className="text-muted">Tổng: {accounts.length}</div>
      </div>

      {filtered.length === 0 && (
        <Alert variant="warning" className="text-center">Không tìm thấy kết quả</Alert>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filtered.map(acc => (
          <Col key={acc.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={acc.avatar} alt={acc.username} />
              <Card.Body>
                <Card.Title className="text-capitalize">@{acc.username}</Card.Title>
                <Card.Text className="mb-1">
                  ID: <strong>{acc.id}</strong>
                </Card.Text>
                <Card.Text className="mb-0">
                  Password: <code>{acc.password}</code>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
