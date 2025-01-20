
import { useState, useEffect } from "react";
import { doc, getDocs,collection} from "firebase/firestore"; 
import {db} from './config';
import { Row, Col, Container, Navbar } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function Summary() {
    const [data, setData] = useState([]);
    const [cookieList, setCookieList] = useState([]);
    const [recentlyAddedTables, setRecentlyAddedTables] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Tables"));
                const tables = [];
                querySnapshot.forEach((table) => {
                    tables.push({ id: table.id, numGuests: table.numGuests, ...table.data() });
                });
                setData(tables);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const storedArray = sessionStorage.getItem('RecentlyAdded');
        if (storedArray) {
            setRecentlyAddedTables(JSON.parse(storedArray));
        }
    }, []);

    return (
        <div>
            <h1>You have {data.length} tables in the Habibi Restaurant.</h1>
            <br />
            <h1>You have recently added {recentlyAddedTables.length} occupied tables. Here they are:</h1>
            <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {recentlyAddedTables.map(cookie => (
                        <Col key={cookie.id || cookie.tempKey} md={4} lg={3}> 
                            <Card style={{ backgroundColor: 'var(--bs-warning-bg-subtle)', color: 'black' }}>
                                <Card.Body>
                                    <Card.Title>Table</Card.Title>
                                    <Card.Text>Number of Guests: {cookie.numCustomers}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Summary;
