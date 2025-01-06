import { useState, useEffect } from "react";
import { doc, getDocs,collection} from "firebase/firestore"; 
import {db} from './config';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container, Navbar } from 'react-bootstrap';

function Layout  () {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const querySnapshot = await getDocs(collection(db, "Tables"));
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, numGuests: doc.numGuests, ...doc.data() });
                });
                //updates the array state we have above by adding documents to our state.
                setData(documents);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }   
          
        };
    
        fetchData();
    }, []);
    
    
    return (
        <div>
            <h1>Features Page</h1><p>Here are the features of our restaurant...</p>
            <br></br>
            {data.length > 0 ? (
                <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {data.map((item) => ( 
                        <Col key={item.id} md={4} lg={3}> 
                            <Card style={{ backgroundColor: 'var(--bs-warning-bg-subtle)', color: 'black' }}>
                                <Card.Body>
                                    <Card.Title>Restaurant Table</Card.Title>
                                    <Card.Text>Number of Guests: {item.numGuests}, ID: {item.id}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Layout;