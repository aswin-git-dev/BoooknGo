import React from 'react';
import {Navbar , Nav ,Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
function Navbar() {
  return (
    <>
    <Navbar bg="primary" variant="white" expand="lg" sticky="top">
        <Container>
            <Navbar.Brand>
                BookNGo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collaspe id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link to="/bookhotel" className="mx-2">Book Hotels</Nav.Link>
                     <Nav.Link to="/booktour" className="mx-2">Book Tours</Nav.Link>
                      <Nav.Link to="/transport" className="mx-2">Transport Option</Nav.Link>
                </Nav>
            </Navbar.Collaspe>
            </Container>
    </Navbar>
    </>
  )
}

export default Navbar