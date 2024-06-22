// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
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
