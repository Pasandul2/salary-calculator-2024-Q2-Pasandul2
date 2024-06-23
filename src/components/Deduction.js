import React from 'react';

const Deduction = ({ deduction, onUpdate, onDelete }) => {
  return (
    <div>
      <input
        type="text"
        value={deduction.description}
        onChange={(e) => onUpdate({ ...deduction, description: e.target.value })}
        placeholder="Deduction Description"
      />
      <input
        type="number"
        value={deduction.amount}
        onChange={(e) => onUpdate({ ...deduction, amount: parseFloat(e.target.value) })}
        placeholder="Deduction Amount"
      />
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Deduction;
