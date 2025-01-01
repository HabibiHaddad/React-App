import React from 'react';

function TableForm({ newTable, setNewTable, handleSubmit }) {
  return (
    <form className="table" onSubmit={handleSubmit}>
      <div className="table-row">
        <label>New Table</label>
        <br />
        <input
          type="number"
          name="num-guests"
          value={newTable} // Controlled input
          required
          placeholder="Number of seats"
          onChange={(e) => setNewTable(e.target.value)} // Updates state on change
        />
        <br />
        <button className="add-table">ADD Table</button>
      </div>
    </form>
  );
}

export default TableForm;