import { useState, useEffect } from "react";
import { doc, getDocs,collection,setDoc, Timestamp} from "firebase/firestore"; 
import {db} from './config';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container, Navbar } from 'react-bootstrap';
import TableCard from './Components/TableCard';
import { deleteDoc } from "firebase/firestore";




function Layout  () {
    const [show, setShow] = useState(false);

    const [data, setData] = useState([]);

    const [time, setTime] = useState();

    //hook which retrieves data from database
    useEffect(() => {
        const expirationTime = 1 * 60 * 1000; // 3 minutes in ms
    
        const fetchData = async () => {
            const storedTime = sessionStorage.getItem("TIME_UTC");
            const currentTime = Date.now();
    
            if (!storedTime || (currentTime - parseInt(storedTime, 10)) >= expirationTime) {
                sessionStorage.removeItem('TIME_UTC');
                sessionStorage.removeItem('EntriesFromDB');
                try {
                    const querySnapshot = await getDocs(collection(db, "Tables"));
                    const documents = [];
                    querySnapshot.forEach((doc) => {
                        documents.push({ id: doc.id, ...doc.data() });
                    });
    
                    setData(documents);
                    setTime(currentTime);
                    sessionStorage.setItem('EntriesFromDB', JSON.stringify(documents));
                    sessionStorage.setItem('TIME_UTC', currentTime.toString());
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            } else {
                const storedData = sessionStorage.getItem("EntriesFromDB");
                if (storedData) {
                    setData(JSON.parse(storedData));
                }
            }
        };
    
        fetchData();
    }, []);


    async function handleDelete(id){
        const tableRef = doc(db, "Tables", id);
        try{
        await deleteDoc(tableRef);
        }catch(err){
        console.error("Error deleting", err);
        }
        
        setData(currentTable => {
        return currentTable.filter(data => data.id !== id)
        }) 
    }

    function incrementGuests(id){
        
        setData(currentTables => {
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
        setData(currentTables => {
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
        <div>
            <h1>Features Page</h1><p>Here are the features of our restaurant...</p>
            <br></br>
            {data.length > 0 ? (
                <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {data.map((item) => ( 
                        <Col key={item.id} md={4} lg={3}> 
                            <TableCard key ={item.id} table={item} incrementGuests={incrementGuests} decrementGuests={decrementGuests} handleDelete={handleDelete} setShow={setShow}></TableCard>
                        </Col>
                    ))}
                </Row>
            </Container>
            ) : (
                <p>You don't have any tables setup yet..</p>
            )}
        </div>
    );
}

export default Layout;