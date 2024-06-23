import React, { useContext, useState, useEffect } from 'react';
import { SalaryContext } from '../context/SalaryProvider';
import styled from 'styled-components';
import InputModal from './InputModal';

const SalaryCalculator = () => {
  const {
    state,
    addEarning,
    updateEarning,
    deleteEarning,
    addDeduction,
    updateDeduction,
    deleteDeduction,
    reset,
    setBasicSalary
  } = useContext(SalaryContext);

  const [localBasicSalary, setLocalBasicSalary] = useState(state.basicSalary);
  const [isEarningModalOpen, setIsEarningModalOpen] = useState(false);
  const [isDeductionModalOpen, setIsDeductionModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState(''); 

  useEffect(() => {
    setLocalBasicSalary(state.basicSalary);
  }, [state.basicSalary]);

  const handleBasicSalaryChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setLocalBasicSalary(value);
    setBasicSalary(value);
  };

  const handleAddEarning = (newEarning) => {
    if (editingItem !== null) {
      updateEarning(editingItem.index, newEarning);
    } else {
      addEarning(newEarning);
    }
    setEditingItem(null);
  };

  const handleAddDeduction = (newDeduction) => {
    if (editingItem !== null) {
      updateDeduction(editingItem.index, newDeduction);
    } else {
      addDeduction(newDeduction);
    }
    setEditingItem(null);
  };

  const handleEditEarning = (index) => {
    setEditingItem({ type: 'earning', index });
    setModalType('Earning');
    setIsEarningModalOpen(true);
  };

  const handleEditDeduction = (index) => {
    setEditingItem({ type: 'deduction', index });
    setModalType('Deduction');
    setIsDeductionModalOpen(true);
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center', 
    marginBottom: '10px', 
  };

  return (
    <Container>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Calculate Your Salary</h2>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginBottom: '10px', cursor: 'pointer' }}>
          <img onClick={reset} src='./img/reset.png' alt='reset icon' style={{ marginRight: '5px' }} />
          <span style={{ color: '#0052EA' }} onClick={reset}>Reset</span>
        </div>
      </div>
      <label style={labelStyle}>Basic Salary</label><br/>
      <StyledInput
        type="text"
        value={localBasicSalary}
        onChange={handleBasicSalaryChange}
      /><br/>
      <label style={labelStyle}>Earnings</label>
      <StyledH4>Allowance, Fixed Allowance, Bonus and etc.</StyledH4>
      {state.earnings.map((earning, index) => (
        <EarningItem key={index} checked={earning.epfApplicable}>
    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400', fontSize: '16px' }}>{earning.description}:</span>
    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400', fontSize: '16px', marginLeft: '5px', marginRight: earning.epfApplicable ? '20px' : '0' }}>{earning.amount}</span>
    
    <StyledCheckbox
      type="checkbox"
      checked={earning.epfApplicable}
      onChange={(e) =>
        updateEarning(index, { ...earning, epfApplicable: e.target.checked })
      }
    />
    {earning.epfApplicable && <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: '400', marginLeft: '-10px' }}>EPF/ETF</h4>}
    <div style={{ width: '2px', height: '30px', backgroundColor: '#E0E0E0', margin: '0 10px' }}></div>
    <img src='./img/edit.png' onClick={() => handleEditEarning(index)} alt='edit' />
    <img onClick={() => deleteEarning(index)} src='./img/delete.png' alt='delete' />
  </EarningItem>
      ))}
      <span style={{fontFamily:'Inter, sans-serif',color:'#0052EA',fontWeight:'500',fontSize:'14px',cursor: 'pointer'}} onClick={() => {setEditingItem(null); setIsEarningModalOpen(true); setModalType('Earning');}}>+ Add New Allowance</span><br/>
      <br/>
      <div style={dividerStyle} /> 
      <label style={labelStyle}>Deductions</label><br/>
      <StyledH4>Salary Advances, Loan Deductions and all</StyledH4>
      {state.deductions.map((deduction, index) => (
        <DeductionItem key={index}>
          <span style={{ fontFamily:'Inter, sans-serif',fontWeight:'400',fontSize:'16px'}}>{deduction.description}:</span>
          <span style={{ fontFamily:'Inter, sans-serif',fontWeight:'400',fontSize:'16px',marginLeft: '5px',marginRight:'20px'}}>{deduction.amount}</span>
          <div style={{ width: '2px', height: '30px', backgroundColor: '#E0E0E0', margin: '0 10px' }}></div>
          <img src='./img/edit.png' onClick={() => handleEditDeduction(index)} alt='edit' />
          <img onClick={() => deleteDeduction(index)} src='./img/delete.png' alt='delete' />
        </DeductionItem>
      ))}
      <span style={{ fontFamily:'Inter, sans-serif',color:'#0052EA',fontWeight:'500',fontSize:'14px',cursor: 'pointer'}} onClick={() => {setEditingItem(null); setIsDeductionModalOpen(true); setModalType('Deduction');}}>+ Add New Deduction</span>
      
      <InputModal
        isOpen={isEarningModalOpen}
        onRequestClose={() => setIsEarningModalOpen(false)}
        onSave={handleAddEarning}
        title={editingItem ? "Edit Earning" : "Add New Earning"}
        item={editingItem ? state.earnings[editingItem.index] : null}
        isEarning={true}
      />
      <InputModal
        isOpen={isDeductionModalOpen}
        onRequestClose={() => setIsDeductionModalOpen(false)}
        onSave={handleAddDeduction}
        title={editingItem ? "Edit Deduction" : "Add New Deduction"}
        item={editingItem ? state.deductions[editingItem.index] : null}
      />
    </Container>
  );
};

export default SalaryCalculator;


const StyledCheckbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  pointer-events: none;
 
  &:checked::before {
    content: '✔';
    font-size: 16px;
    text-align: center;
    line-height: 18px;
    color: blue;
    pointer-events: none;
  }
`;


const dividerStyle = {
  width: '100%',
  borderTop: '2px solid #ccc',
  margin: '8px 0',
  backgroundColor:'#E0E0E0'
};

const StyledInput = styled.input`
  margin-top:8px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  padding: 8px 15px;
  margin-bottom: 8px;
  width: 40%;
`;

const StyledH4 = styled.h4`
  margin-top:0.5px;
  margin-bottom:10px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  weight: 400px;
  line-height: 20px;
  color: #757575;
`;

const titleStyle = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '32px',
  letterSpacing: '-0.02px',
};

const labelStyle ={
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.1px',
};

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 95%;
  background-color: #FAFAFA;
   margin:7px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const EarningItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > input[type="text"] {
    margin-right: 10px;
  }

  & > input[type="number"] {
    margin-right: 10px;
  }

  & > input[type="checkbox"] {
    margin-right: 10px;
  }

  & > img {
    margin-left: 10px;
    cursor: pointer;
  }
`;

const DeductionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > input[type="text"] {
    margin-right: 10px;
  }

  & > input[type="number"] {
    margin-right: 10px;
  }

  & > img {
    margin-left: 10px;
    cursor: pointer;
  }
`;
