import React from 'react';
import SalaryCalculator from './components/SalaryCalculator';
import Summary from './components/Summary';
import { SalaryProvider } from './context/SalaryProvider';
import styled from 'styled-components';

const App = () => {
  return (
    <SalaryProvider>
      <AppContainer>
        <SalaryCalculator />
        <Summary />
      </AppContainer>
    </SalaryProvider>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
