import { useContext } from 'react';
import { SalaryContext } from '../context/SalaryContext';

export const useSalary = () => {
  const { state, dispatch } = useContext(SalaryContext);

  const setBasicSalary = (salary) => {
    dispatch({ type: 'SET_BASIC_SALARY', payload: salary });
  };

  const addEarning = (earning) => {
    dispatch({ type: 'ADD_EARNING', payload: earning });
  };

  const updateEarning = (index, earning) => {
    dispatch({ type: 'UPDATE_EARNING', payload: { index, earning } });
  };

  const deleteEarning = (index) => {
    dispatch({ type: 'DELETE_EARNING', payload: index });
  };

  const addDeduction = (deduction) => {
    dispatch({ type: 'ADD_DEDUCTION', payload: deduction });
  };

  const updateDeduction = (index, deduction) => {
    dispatch({ type: 'UPDATE_DEDUCTION', payload: { index, deduction } });
  };

  const deleteDeduction = (index) => {
    dispatch({ type: 'DELETE_DEDUCTION', payload: index });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    ...state,
    setBasicSalary,
    addEarning,
    updateEarning,
    deleteEarning,
    addDeduction,
    updateDeduction,
    deleteDeduction,
    reset,
  };
};
