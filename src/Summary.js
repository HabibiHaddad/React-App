
import { useState, useEffect } from "react";
import { doc, getDocs,collection} from "firebase/firestore"; 
import {db} from './config';
import { Row, Col, Container, Navbar } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function Summary(){
  const [data, setData] = useState([]);
  const [cookieList, setCookieList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const querySnapshot = await getDocs(collection(db, "Tables"));
                const tables = [];
                querySnapshot.forEach((table) => {
                    tables.push({ id: table.id, numGuests: table.numGuests, ...table.data() });
                });
                //updates the array state we have above by adding documents to our state.
                setData(tables);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }   
          
        };
    
        fetchData();
        //Calls sessionStorageRetrieval function to display recently added tables.
        sessionStorageRetrieval();
    }, []);
    //Retrieves the cookie storage and proceeds to display the current occupied tables
    function sessionStorageRetrieval(){
      var cookies = [];
      for(let i = 0; i < sessionStorage.length;i++){
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        cookies.push({ id: key, numGuests: value, occupied: true });
      }
      setCookieList(cookies);
    }
    return (
      <div>
        <h1>You have {data.length} tables in the Habibi Restaurant.</h1>
        <br></br>
        <h1>You have recently added {cookieList.length} occupied tables. Here they are:</h1>
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {cookieList.map(cookie =>(
          <Col key={cookie.id} md={4} lg={3}> 
              <Card style={{ backgroundColor: 'var(--bs-warning-bg-subtle)', color: 'black' }}>
                  <Card.Body>
                      <Card.Title>Table</Card.Title>
                      <Card.Text>Number of Guests: {cookie.numGuests}, ID: {cookie.id}</Card.Text>
                  </Card.Body>
              </Card>
          </Col>
        ))}
        </Row>
        </Container>
      </div>
    );
};
  

export default Summary;