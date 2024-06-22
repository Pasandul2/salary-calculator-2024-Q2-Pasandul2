import React, { createContext, useReducer, useEffect } from 'react';
import { calculateSalary } from '../utils/calculateSalary';

const initialState = {
  basicSalary: 0,
  earnings: [],
  deductions: [],
  grossEarnings: 0,
  grossDeductions: 0,
  employeeEPF: 0,
  apit: 0,
  netSalary: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BASIC_SALARY':
      return { ...state, basicSalary: action.payload };
    case 'ADD_EARNING':
      return { ...state, earnings: [...state.earnings, action.payload] };
    case 'UPDATE_EARNING':
      const updatedEarnings = state.earnings.map((earning, index) =>
        index === action.payload.index ? action.payload.earning : earning
      );
      return { ...state, earnings: updatedEarnings };
    case 'DELETE_EARNING':
      const filteredEarnings = state.earnings.filter((_, index) => index !== action.payload);
      return { ...state, earnings: filteredEarnings };
    case 'ADD_DEDUCTION':
      return { ...state, deductions: [...state.deductions, action.payload] };
    case 'UPDATE_DEDUCTION':
      const updatedDeductions = state.deductions.map((deduction, index) =>
        index === action.payload.index ? action.payload.deduction : deduction
      );
      return { ...state, deductions: updatedDeductions };
    case 'DELETE_DEDUCTION':
      const filteredDeductions = state.deductions.filter((_, index) => index !== action.payload);
      return { ...state, deductions: filteredDeductions };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const SalaryContext = createContext();

export const SalaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { grossEarnings, grossDeductions, employeeEPF, apit, netSalary } = calculateSalary(
      state.basicSalary,
      state.earnings,
      state.deductions
    );
    dispatch({ type: 'SET_SALARY_DETAILS', payload: { grossEarnings, grossDeductions, employeeEPF, apit, netSalary } });
  }, [state.basicSalary, state.earnings, state.deductions]);

  const setBasicSalary = (salary) => dispatch({ type: 'SET_BASIC_SALARY', payload: salary });
  const addEarning = (earning) => dispatch({ type: 'ADD_EARNING', payload: earning });
  const updateEarning = (index, earning) => dispatch({ type: 'UPDATE_EARNING', payload: { index, earning } });
  const deleteEarning = (index) => dispatch({ type: 'DELETE_EARNING', payload: index });
  const addDeduction = (deduction) => dispatch({ type: 'ADD_DEDUCTION', payload: deduction });
  const updateDeduction = (index, deduction) => dispatch({ type: 'UPDATE_DEDUCTION', payload: { index, deduction } });
  const deleteDeduction = (index) => dispatch({ type: 'DELETE_DEDUCTION', payload: index });
  const reset = () => dispatch({ type: 'RESET' });

  return (
    <SalaryContext.Provider
      value={{
        state,
        setBasicSalary,
        addEarning,
        updateEarning,
        deleteEarning,
        addDeduction,
        updateDeduction,
        deleteDeduction,
        reset,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};
