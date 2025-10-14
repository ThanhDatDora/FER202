import { useState } from "react";
import { Navbar, Nav, Form, Button, NavDropdown, Badge } from "react-bootstrap";

export default function AppNavBar({ onSearch, favCount = 0, onNavigate }) {
  const [q, setQ] = useState("");

  const go = (e, where) => {
    e.preventDefault();
    if (onNavigate) onNavigate(where);
  };

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(q);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand href="#" onClick={(e) => go(e, "home")}>
          MovieApp
        </Navbar.Brand>

        {/* Liên kết Toggle ↔ Collapse */}
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={(e) => go(e, "home")}>Home</Nav.Link>
            <Nav.Link href="#" onClick={(e) => go(e, "about")}>About</Nav.Link>
            <Nav.Link href="#" onClick={(e) => go(e, "contact")}>Contact</Nav.Link>
          </Nav>

          <Form className="d-flex me-3" onSubmit={submit} role="search" aria-label="Quick search">
            <Form.Control
              placeholder="Quick search"
              className="me-2"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button type="submit" variant="outline-light">Search</Button>
          </Form>

          <Nav>
            <NavDropdown title="Account" id="account-dropdown" align="end">
              <NavDropdown.Item href="#" onClick={(e) => go(e, "profile")}>
                Manage Your Profiles
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={(e) => go(e, "account")}>
                Build Your Account
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={(e) => go(e, "password")}>
                Change Password
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#" onClick={(e) => go(e, "login")} className="ms-2">
              Login
            </Nav.Link>

            <Nav.Link href="#" onClick={(e) => go(e, "favourites")} className="ms-2 position-relative">
              ❤️
              {favCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {favCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
