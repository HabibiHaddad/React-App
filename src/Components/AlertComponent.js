import React from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertComponent({ show, setShow }) {
  if (!show) return null;

  return (
    <Alert variant="warning" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Don't click again</Alert.Heading>
      <p>This is a warning to not click this button again!</p>
    </Alert>
  );
}

export default AlertComponent;