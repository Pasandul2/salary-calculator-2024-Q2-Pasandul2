export const calculateNetSalary = (basicSalary, earnings, deductions) => {
    let grossEarnings = basicSalary + earnings.reduce((sum, earning) => sum + earning.amount, 0);
    let grossDeductions = deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
  
    // EPF (8%) calculation
    let epf = (grossEarnings * 0.08);
  
    // APIT calculation
    let apit = (grossEarnings - epf - grossDeductions) * 0.02; // Example percentage for APIT
  
    let netSalary = grossEarnings - grossDeductions - epf - apit;
  
    return {
      grossEarnings,
      grossDeductions,
      epf,
      apit,
      netSalary
    };
  };
  
  