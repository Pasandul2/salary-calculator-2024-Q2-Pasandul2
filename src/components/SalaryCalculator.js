// SalaryCalculator.js
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

  useEffect(() => {
    setLocalBasicSalary(state.basicSalary);
  }, [state.basicSalary]);

  const handleBasicSalaryChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setLocalBasicSalary(value);
    setBasicSalary(value);
  };

  const handleAddEarning = (newEarning) => {
    addEarning(newEarning);
  };

  const handleAddDeduction = (newDeduction) => {
    addDeduction(newDeduction);
  };

  return (
    <Container>
      <h2 style={titleStyle}>Calculate Your Salary</h2>
      <label style={labelStyle}>Basic Salary</label><br></br>
      <StyledInput
        type="text"
        value={localBasicSalary}
        onChange={handleBasicSalaryChange}
      /><br></br>
      <label style={labelStyle}>Earnings</label>
      <StyledH4>Allowance, Fixed Allowance, Bonus and etc.</StyledH4>
      {state.earnings.map((earning, index) => (
        <EarningItem key={index}>
          <input
            type="text"
            value={earning.description}
            onChange={(e) =>
              updateEarning(index, { ...earning, description: e.target.value })
            }
          />
          <input
            type="number"
            value={earning.amount}
            onChange={(e) =>
              updateEarning(index, { ...earning, amount: parseFloat(e.target.value) || 0 })
            }
          />
          <input
            type="checkbox"
            checked={earning.epfApplicable}
            onChange={(e) =>
              updateEarning(index, { ...earning, epfApplicable: e.target.checked })
            }
          />
          <button onClick={() => deleteEarning(index)}>X</button>
        </EarningItem>
      ))}
      <button onClick={() => setIsEarningModalOpen(true)}>+ Add New Allowance</button>
      <br></br>
      <label style={labelStyle}>Deductions</label><br></br>
      {state.deductions.map((deduction, index) => (
        <DeductionItem key={index}>
          <input
            type="text"
            value={deduction.description}
            onChange={(e) =>
              updateDeduction(index, { ...deduction, description: e.target.value })
            }
          />
          <input
            type="number"
            value={deduction.amount}
            onChange={(e) =>
              updateDeduction(index, { ...deduction, amount: parseFloat(e.target.value) || 0 })
            }
          />
          <button onClick={() => deleteDeduction(index)}>X</button>
        </DeductionItem>
      ))}
      <button onClick={() => setIsDeductionModalOpen(true)}>+ Add New Deduction</button>
      <button onClick={reset}>Reset</button>

      <InputModal
        isOpen={isEarningModalOpen}
        onRequestClose={() => setIsEarningModalOpen(false)}
        onSave={handleAddEarning}
        title="Add New Earning"
      />
      <InputModal
        isOpen={isDeductionModalOpen}
        onRequestClose={() => setIsDeductionModalOpen(false)}
        onSave={handleAddDeduction}
        title="Add New Deduction"
      />
    </Container>
  );
};

export default SalaryCalculator;

const StyledInput = styled.input`
  margin-top:8px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  padding: 8px 15px;
  margin-bottom: 8px;
`;

const StyledH4 = styled.h4`
  margin-top:0.5px;
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
  width: 100%;
  background-color: #E0E0E0;

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

  & > button {
    margin-left: 10px;
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

  & > button {
    margin-left: 10px;
  }
`;
