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
      <h2 style={{fontFamily:'Inter, sans-serif',fontSize:'20px',fontWeight:'700'}}>Your Salary</h2>
      <p style={{fontFamily:'Inter, sans-serif',fontSize:'14px',fontWeight:'600',color:'#757575'}}>Items</p>
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
      </SummaryItem><br></br>
      <SummaryItemContainer>
      <SummaryItem>
        <span style={{border:'1px'}}>Net Salary (Take Home)</span>
        <span>{netSalary}</span>
        </SummaryItem>
      </SummaryItemContainer>
      <p style={{fontFamily:'Inter, sans-serif',fontSize:'14px',fontWeight:'600',color:'#757575'}}>Contribution from the Employer</p>
      <SummaryItem>
        <span>Employer EPF (12%)</span>
        <span>{state.basicSalary * 0.12}</span>
      </SummaryItem>
      <SummaryItem>
        <span>Employer ETF (3%)</span>
        <span>{state.basicSalary * 0.03}</span>
      </SummaryItem><br></br>
      <SummaryItem>
        <span>CTC (Cost to Company)</span>
        <span>{state.basicSalary + (state.basicSalary * 0.12) + (state.basicSalary * 0.03)}</span>
      </SummaryItem>
    </Container>
  );
};

export default Summary;

const SummaryItemContainer = styled.div`
  border: 1px solid #E0E0E0;
  padding: 8px; 
  padding-top:18px;
  border-radius: 4px;
`;

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

  span{
      
      margin-bottom: 5px;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px
    }
  
`;
