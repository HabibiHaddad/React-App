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
          value={newTable}
          onChange={e => setNewTable(e.target.value)}
        />
        <br />
        <button className="add-table">ADD Table</button>
      </div>
    </form>
  );
}

export default TableForm;