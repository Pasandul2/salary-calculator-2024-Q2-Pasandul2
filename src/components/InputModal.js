import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const InputModal = ({ isOpen, onRequestClose, onSave, title, item, isEarning }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [epfApplicable, setEpfApplicable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setDescription(item.description);
        setAmount(item.amount);
        setEpfApplicable(item.epfApplicable || false);
      } else {
        setDescription('');
        setAmount('');
        setEpfApplicable(false);
      }
      setErrorMessage('');
    }
  }, [isOpen, item]);

  const handleSave = () => {
    if (description.trim() === '' || amount.trim() === '') {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

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
      <h2 style={{fontFamily:'Inter, sans-serif',fontSize:'16px',fontWeight:'600',margin:'20px'}}>{title}</h2>
      <div style={dividerStyle} />
      <div style={{margin:'20px'}}>
        <h4 style={{ marginBottom:'3px',fontFamily:'Inter, sans-serif',fontWeight:'600',fontSize:'14px',color:'#00318C'}}>Name</h4>
        <Input
          type="text"
          placeholder="Eg: Travel"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h4 style={{marginBottom:'3px',fontFamily:'Inter, sans-serif',fontWeight:'600',fontSize:'14px',color:'#00318C'}}>Amount</h4>
        <Input
          type="number"
          placeholder="Eg: 10,000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {isEarning && (
          <div style={{marginTop:'20px'}}>
            <input 
              type="checkbox"
              checked={epfApplicable}  style={{backgroundColor:'blue'}}
              onChange={(e) => setEpfApplicable(e.target.checked)}
            />
            <label style={{marginLeft:'10px',fontFamily:'Inter, sans-serif'}}>EPF/ETF</label>
          </div>
        )}
      </div>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      <br />
      <div style={dividerStyle} />
      <div style={{marginLeft:'65%'}}>
        <Button style={{backgroundColor:'white',width:'79px',height:'40px',borderRadius:'4px',padding:'12px',gap:'10px',color:'#0052EA',borderColor:'white'}} onClick={onRequestClose}>Cancel</Button>
        <Button style={{backgroundColor:'#0052EA', borderRadius:'4px',borderColor:'#0052EA',padding:'10px' , width:'60px',height:'40px', fontFamily:'Inter, sans-serif',fontSize:'14px',fontWeight:'500',color:'white'}} onClick={handleSave}>Add</Button>
      </div>
    </Modal>
  );
};

export default InputModal;

const dividerStyle = {
  margin:'0px',
  borderTop: '1px solid #ccc',
};

const Input = styled.input`
  display: block;
  padding: 10px;
  width: 492px;
  height: 32px;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin: 10px 5px;
  padding: 10px 20px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  margin-left:25px;
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    borderRadius: '8px',
  },
};
