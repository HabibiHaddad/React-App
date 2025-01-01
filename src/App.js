
import './App.css';
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import TableForm from './Components/TableForm';
import TableCard from './Components/TableCard';
import AlertComponent from './Components/AlertComponent';
import { Row, Col, Container } from 'react-bootstrap';

function App() {
  const [newTable, setNewTable] = useState()
  const[tables,setTables] = useState([])
  const [show, setShow] = useState(false);
  function handleSubmit(e){
    e.preventDefault()
    setTables(currentTables =>{
      return [
        ...currentTables,
        {id: crypto.randomUUID(), numGuests: newTable, occupied: false},
      ]
    })
  }

  function handleDelete(id){
    setTables(currentTable => {
      return currentTable.filter(tables => tables.id !== id)
    }) 
  }

  function incrementGuests(id){
    setTables(currentTables => {
      return currentTables.map(table => {
        if(table.id === id){
          return {...table,  numGuests: parseInt(table.numGuests) + 1};
        }
        return table;
      })
      
    })
  }

  function decrementGuests(id){
    setTables(currentTables => {
      return currentTables.map(table => {
        if(table.id === id) {
          return {...table, numGuests:parseInt(table.numGuests) - 1};
        }
        return table;
      })
    })
  }
  
  return (
    <>
      <TableForm newTable ={newTable} setNewTable={setNewTable} handleSubmit={handleSubmit}></TableForm>
      <h1>Restaurant Tables</h1>
      <Container >
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        
      {tables.map(table => (
        
          <Col>
            <TableCard key ={table.id} table={table} incrementGuests={incrementGuests} decrementGuests={decrementGuests} handleDelete={handleDelete} setShow={setShow}></TableCard>
          </Col>
        
      ))}
      </Row>
      

    <AlertComponent show={show} setShow={setShow} />
    </Container>
    </>
  )
}

export default App;
