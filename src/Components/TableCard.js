import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container } from 'react-bootstrap';

function TableCard({ table, incrementGuests, decrementGuests, handleDelete, setShow }) {
  return (
    
        <Card bg="dark"
        text = "white"
        // className="table"
        // style={{
        //     // width: '18rem',
        //     display: 'block',
        //     margin: 'auto',
        //     backgroundColor: 'hsl(200, 100%, 90%)',
        // }}
        >
        <Card.Body>
            <Card.Title>Restaurant Table # of Seats</Card.Title>
            <Card.Text>{table.numGuests}</Card.Text>
            <button className="increment" onClick={() => incrementGuests(table.id)}>
            +
            </button>
            <Button variant="primary" onClick={() => setShow(true)}>
            Alert
            </Button>
            <button className="decrement" onClick={() => decrementGuests(table.id)}>
            -
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(table.id)}>
            Delete
            </button>
        </Card.Body>
        </Card>
        
  );
    // return (
    //     <Container className="d-flex justify-content-center align-items-center" style={{ height: '35vh' }}>
    //         <Row xs={1} sm={2} md={3} lg={3} className="g-4">
    //             {table.map((t) => (
    //                 <Col key={t.id}>
    //                     <Card
    //                         className="table"
    //                         style={{
    //                             width: '18rem',
    //                             display: 'block',
    //                             margin: '18rem',
    //                             backgroundColor: 'hsl(200, 100%, 90%)',
    //                         }}
    //                     >
    //                         <Card.Body>
    //                             <Card.Title>Restaurant Table</Card.Title>
    //                             <Card.Text>Number of Seats: {t.numGuests}</Card.Text>
    //                             <button className="increment" onClick={() => incrementGuests(t.id)}>
    //                                 +
    //                             </button>
    //                             <Button variant="primary" onClick={() => setShow(true)}>
    //                                 Alert
    //                             </Button>
    //                             <button className="decrement" onClick={() => decrementGuests(t.id)}>
    //                                 -
    //                             </button>
    //                             <button className="btn btn-danger" onClick={() => handleDelete(t.id)}>
    //                                 Delete
    //                             </button>
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //             ))}
    //         </Row>
    //     </Container>
    // );
}

export default TableCard;