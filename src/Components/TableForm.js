import React from 'react';

function TableForm({ newTable, setNewTable, handleSubmit }) {
  return (
    <form className="table" onSubmit={handleSubmit}>
      <div className="d-flex flex-column align-items-center vh-20 justify-content-center">
        <label className="mb-1">
          <h2>New Table</h2>
        </label>
        
        <input
          type="number"
          name="num-guests"
          className="form-control  mb-2" 
          style={{ width: '325px' }} 
          value={newTable} // Controlled input
          required
          placeholder="Number of seats"
          onChange={(e) => setNewTable(e.target.value)} // Updates state on change
        />

        <button type="submit" className="btn btn-primary w-25">ADD Table</button>
      </div>
    </form>
  );
}

export default TableForm;