import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { auth } from '../config';
import { signOut } from 'firebase/auth';
import UserContext from '../Conexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from 'lucide-react';

const MyNavbar = () => {

  return (
    <Navbar bg="danger" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Habibi Restaurant</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/layout">Layout</Nav.Link>
            <Nav.Link as={Link} to="/summary">Summary</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default MyNavbar;