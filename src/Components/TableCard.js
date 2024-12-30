import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function TableCard({ table, incrementGuests, decrementGuests, handleDelete, setShow }) {
  return (
    <Card
      className="table"
      style={{
        width: '18rem',
        display: 'block',
        margin: 'auto',
        backgroundColor: 'hsl(200, 100%, 90%)',
      }}
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
}

export default TableCard;