import React from 'react';

const Earning = ({ earning, onUpdate, onDelete }) => {
  return (
    <div>
      <input
        type="text"
        value={earning.description}
        onChange={(e) => onUpdate({ ...earning, description: e.target.value })}
        placeholder="Earning Description"
      />
      <input
        type="number"
        value={earning.amount}
        onChange={(e) => onUpdate({ ...earning, amount: parseFloat(e.target.value) })}
        placeholder="Earning Amount"
      />
      <label>
        <input
          type="checkbox"
          checked={earning.epfApplicable}
          onChange={(e) => onUpdate({ ...earning, epfApplicable: e.target.checked })}
        />
        EPF/ETF
      </label>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Earning;
