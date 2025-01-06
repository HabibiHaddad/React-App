
import { useState, useEffect } from "react";
import { doc, getDocs,collection} from "firebase/firestore"; 
import {db} from './config';



function Summary(){
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
        <h1>You have {data.length} tables in the Habibi Restaurant that are occupied.</h1>
        <br></br>
        <h1>Keep Up The Good Work!</h1>
      </div>
    );
};
  

export default Summary;