
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
import Nav from 'react-bootstrap/Nav';
import Summary from './Summary'

function Home(){
    
    //num of guests is newTable and tables is list of Tables in restaurant
    const [newTable, setNewTable] = useState()
    const[tables,setTables] = useState([])
    const [show, setShow] = useState(false);

    
    const [recentlyAddedTables,setRecentlyAddedTables] = useState([]);
    const [sortOrder,setSortOrder] = useState(true);

    //This is a hook. Adds cookie to the session. Hooks are used outside of functions. They are rendered after recentlyAddedTables is changed.
    useEffect(() => {
        //setRecentlyAddedTables(JSON.parse(sessionStorage.getItem('RecentlyAdded')))
        // Update session storage whenever myArray changes 
        sessionStorage.setItem('RecentlyAdded', JSON.stringify(recentlyAddedTables));
    }, [recentlyAddedTables]);

    function handleASCSortChange (e) {
        setSortOrder(true);
        //console.log(sortOrder);
    }
    function handleADESCSortChange(e){
        setSortOrder(false);
    }
    const sortedTables = [...tables].sort((a, b) => {
        if (sortOrder) {
            return a.numGuests - b.numGuests; 
        } else {
            return b.numGuests - a.numGuests;
        }
    });
    function handleSubmit(e){
        e.preventDefault()
        var idCreated = crypto.randomUUID()
        var chairsAtTable = newTable
        
        //Adds table to most recently added tables in the session storage array. 
        const addTable = (idCreated, chairsAtTable) => {
            setRecentlyAddedTables(prevArr => [...prevArr, {id: idCreated, numCustomers: chairsAtTable}])
        };
        addTable(idCreated,chairsAtTable);
        
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
        
        //Removed table from the array for recentlyAddedTables
        const removeTable = (idCreated) => {
            setRecentlyAddedTables(recentlyAddedTables.filter(tableEntry => tableEntry.id !== idCreated))
        };

        removeTable(id);

        setTables(currentTable => {
            return currentTable.filter(tables => tables.id !== id)
        }) 
    }

    function incrementGuests(id){
        //update cookie session by updating array
        setRecentlyAddedTables(recentlyAddedTables.map(tableEntry => {
            if (tableEntry.id === id) {
                return {
                    ...tableEntry,
                    numCustomers: parseInt(tableEntry.numCustomers) + 1
                };
            } 
            return tableEntry; //does nothing if not found
            
        }));

        


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

        setRecentlyAddedTables(recentlyAddedTables.map(tableEntry => {
            if (tableEntry.id === id) {
                return {
                    ...tableEntry,
                    numCustomers: parseInt(tableEntry.numCustomers) - 1
                };
            }
            return tableEntry; 
        }));

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
            <br></br>
            <div className="d-flex justify-content-center">
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group" >
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={sortOrder === 'ascending'} onChange={handleASCSortChange}/>
                    <label className="btn btn-dark" htmlFor="btnradio1">Ascending</label>
        
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={sortOrder === 'descending'} onChange={handleADESCSortChange} />
                    <label className="btn btn-light" htmlFor="btnradio2">Descending</label>
                </div>   
            </div>
            
            <TableForm newTable={newTable} setNewTable={setNewTable} handleSubmit={handleSubmit} />
            
            <h2>Restaurant Tables</h2>
            
            <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {sortedTables.map(table => (
                        <Col key={table.id}>
                            <TableCard 
                                table={table} 
                                incrementGuests={incrementGuests} 
                                decrementGuests={decrementGuests} 
                                handleDelete={handleDelete} 
                                setShow={setShow} 
                            />
                        </Col>
                    ))}
                </Row>
                <AlertComponent show={show} setShow={setShow} />
            </Container>
        </>
    )
}
  
  export default Home;