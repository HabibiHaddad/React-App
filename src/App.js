
import './App.css';
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import TableForm from './Components/TableForm';
import TableCard from './Components/TableCard';
import AlertComponent from './Components/AlertComponent';
import { Row, Col, Container, Navbar } from 'react-bootstrap';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from './config'
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Layout from './Layout';
import Home from './Home'
import Nav from 'react-bootstrap/Nav';
import Summary from './Summary'

function App() {
  
  const [showHome,setShowHome] = useState(false);

  
  
  return (
    <>
      <BrowserRouter>
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

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/summary" element={<Summary/>} />
      </Routes>

      
    </BrowserRouter>
    
    
    </>
  )
}

export default App;
