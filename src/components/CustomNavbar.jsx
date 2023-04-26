import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <Navbar bg="light" expand="sm" fixed="bottom" className="navBar">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="/Weather-logo.png" alt="Your Site Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0">
            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/your-cities" className="nav-link">
              Favourites
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
