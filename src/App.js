
import './App.css';
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import TableForm from './Components/TableForm';
import TableCard from './Components/TableCard';
import AlertComponent from './Components/AlertComponent';
import { Row, Col, Container } from 'react-bootstrap';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from './config'
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";


function App() {
  //newTable is an integer that includes the num of guests.
  const [newTable, setNewTable] = useState()
  const[tables,setTables] = useState([])
  const [show, setShow] = useState(false);


  function handleSubmit(e){
    e.preventDefault()
    var idCreated = crypto.randomUUID()
    var chairsAtTable = newTable
    setTables(currentTables =>{
      return [
        ...currentTables,
        {id: idCreated, numGuests: chairsAtTable, occupied: false},
      ]
    })
    //saving content in firebase
    const tableRef = doc(db, 'Tables', idCreated);
    setDoc(tableRef, { id: idCreated , numGuests: chairsAtTable })
    .then(() => {
      console.log('Successfully put in firebase');
    })
    .catch(err => {
      console.error('Error', err);
    })
  }

  async function handleDelete(id){
    const tableRef = doc(db, "Tables", id);
    try{
      await deleteDoc(tableRef);
    }catch(err){
      console.error("Error deleting", err);
    }
    
    setTables(currentTable => {
      return currentTable.filter(tables => tables.id !== id)
    }) 
  }

  function incrementGuests(id){
    
    setTables(currentTables => {
      return currentTables.map(table => {
        if(table.id === id){
          const tableRef = doc(db, 'Tables', id);
          setDoc(tableRef, { id: id , numGuests: table.numGuests + 1 })
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
          const tableRef = doc(db, 'Tables', id);
          setDoc(tableRef, { id: id , numGuests: table.numGuests - 1 })
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
