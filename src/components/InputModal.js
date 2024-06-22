// InputModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const InputModal = ({ isOpen, onRequestClose, onSave, title }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [epfApplicable, setEpfApplicable] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDescription('');
      setAmount('');
      setEpfApplicable(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    const newItem = {
      description,
      amount: parseFloat(amount) || 0,
      epfApplicable,
    };
    onSave(newItem);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Item"
      style={customStyles}
    >
      <h2>{title}</h2>
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {title.includes('Earning') && (
        <>
          <label>EPF/ETF</label>
          <input
            type="checkbox"
            checked={epfApplicable}
            onChange={(e) => setEpfApplicable(e.target.checked)}
          />
        </>
      )}
      <Button onClick={handleSave}>Add</Button>
      <Button onClick={onRequestClose}>Cancel</Button>
    </Modal>
  );
};

export default InputModal;

const Input = styled.input`
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin: 10px 5px;
  padding: 10px 20px;
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '8px',
  },
};
