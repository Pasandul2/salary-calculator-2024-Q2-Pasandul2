import React, { useContext } from 'react';
import { SalaryContext } from '../context/SalaryProvider';
import styled from 'styled-components';

const Summary = () => {
  const { state } = useContext(SalaryContext);

  const {
    grossEarnings,
    grossDeductions,
    employeeEPF,
    apit,
    netSalary,
  } = state;

  return (
    <Container>
      <h2>Your Salary</h2>
      <SummaryItem>
        <span>Basic Salary</span>
        <span>{state.basicSalary}</span>
      </SummaryItem>
      <SummaryItem>
        <span>Gross Earning</span>
        <span>{grossEarnings}</span>
      </SummaryItem>
      <SummaryItem>
        <span>Gross Deduction</span>
        <span>{grossDeductions}</span>
      </SummaryItem>
      <SummaryItem>
        <span>Employee EPF (8%)</span>
        <span>{employeeEPF}</span>
      </SummaryItem>
      <SummaryItem>
        <span>APIT</span>
        <span>{apit}</span>
      </SummaryItem>
      <SummaryItem>
        <span>Net Salary (Take Home)</span>
        <span>{netSalary}</span>
      </SummaryItem>
      <h3>Contribution from the Employer</h3>
      <SummaryItem>
        <span>Employer EPF (12%)</span>
        <span>{state.basicSalary * 0.12}</span>
      </SummaryItem>
      <SummaryItem>
        <span>Employer ETF (3%)</span>
        <span>{state.basicSalary * 0.03}</span>
      </SummaryItem>
      <SummaryItem>
        <span>CTC (Cost to Company)</span>
        <span>{state.basicSalary + (state.basicSalary * 0.12) + (state.basicSalary * 0.03)}</span>
      </SummaryItem>
    </Container>
  );
};

export default Summary;

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 10px;
    h2, h3 {
      font-size: 1.2rem;
    }
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  span:last-child {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    span {
      display: block;
      margin-bottom: 5px;
    }
  }
`;
