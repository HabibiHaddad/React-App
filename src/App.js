
import './App.css';
import { useState } from "react"
function App() {
  const [newTable, setNewTable] = useState()
  const[tables,setTables] = useState([])
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
      <form className="table" onSubmit={handleSubmit}>
        <div className="table-row">
          <label>New Table</label>
          <br></br>
          <input type="number" name="num-guests" value={newTable} onChange={e => setNewTable(e.target.value)}></input>
          <br></br>
          <button className="add-table">ADD Table</button>
        </div>
      </form>
      <h1>Restaurant Tables</h1>
      {tables.map(table => {
        return (
          <span class="inline-box" key={table.id}>
            {table.numGuests}<button className="btn btn-danger" onClick={()=> handleDelete(table.id)}>Delete</button>
            <br></br><br></br><br></br>
            <div class="buttons">
              <button className="increment" onClick={() => incrementGuests(table.id)}>+</button>
              
              <button className="decrement" onClick={() => decrementGuests(table.id)}>-</button>
            </div>
          </span>
        )
      })}

      
      
      
     
    </>
  )
}

export default App;
