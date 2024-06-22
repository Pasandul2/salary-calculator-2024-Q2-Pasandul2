import React, { useContext } from 'react';
import { SalaryContext } from '../context/SalaryContext';
import Earning from './Earning';
import Deduction from './Deduction';
import Summary from './Summary';

const SalaryCalculator = () => {
  const { state, dispatch } = useContext(SalaryContext);

  const handleBasicSalaryChange = (e) => {
    dispatch({ type: 'SET_BASIC_SALARY', payload: parseFloat(e.target.value) });
  };

  return (
    <div className="salary-calculator">
      <div className="form">
        <label>
          Basic Salary:
          <input type="number" value={state.basicSalary} onChange={handleBasicSalaryChange} />
        </label>
        <Earning />
        <Deduction />
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </div>
      <Summary />
    </div>
  );
};

export default SalaryCalculator;
