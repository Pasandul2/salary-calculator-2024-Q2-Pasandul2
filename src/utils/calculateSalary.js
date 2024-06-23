export const calculateSalary = (basicSalary, earnings, deductions) => {
  const grossEarnings = earnings.reduce((sum, earning) => sum + earning.amount, basicSalary);
  const grossDeductions = deductions.reduce((sum, deduction) => sum + deduction.amount, 0);

  const totalEarningsForEPF = basicSalary + earnings
    .filter(earning => earning.epfAllowed)
    .reduce((sum, earning) => sum + earning.amount, 0);

  const grossSalaryForEPF = totalEarningsForEPF - grossDeductions;

  const employeeEPF = grossSalaryForEPF * 0.08;
  const employerEPF = grossSalaryForEPF * 0.12;
  const employerETF = grossSalaryForEPF * 0.03;


  const apit = (grossEarnings * 0.18) - 25500; 

  const netSalary = grossEarnings - grossDeductions - employeeEPF - apit;

  const costToCompany = grossEarnings + employerEPF + employerETF;

  return {
    grossEarnings,
    grossDeductions,
    totalEarningsForEPF,
    grossSalaryForEPF,
    employeeEPF,
    employerEPF,
    employerETF,
    apit,
    netSalary,
    costToCompany,
  };
};
