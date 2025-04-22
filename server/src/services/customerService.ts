import { Customer } from '../types/customer';

// In-memory data store
const customers: Customer[] = [
  {
    customerId: 'CUST1001',
    name: 'Alice Johnson',
    monthlyIncome: 6200,
    monthlyExpenses: 3500,
    creditScore: 710,
    outstandingLoans: 15000,
    loanRepaymentHistory: [1, 0, 1, 1, 1, 1, 0, 1],
    accountBalance: 12500,
    status: 'Review',
  },
  {
    customerId: 'CUST1002',
    name: 'Bob Smith',
    monthlyIncome: 4800,
    monthlyExpenses: 2800,
    creditScore: 640,
    outstandingLoans: 20000,
    loanRepaymentHistory: [1, 1, 1, 0, 0, 1, 0, 0],
    accountBalance: 7300,
    status: 'Approved',
  },
];

// Service functions
export const getAllCustomers = (): Customer[] => {
  return customers;
};

export const updateCustomerStatus = (customerId: string, status: string): Customer => {
  const validStatuses = ['Review', 'Approved', 'Rejected'];
  const customer = customers.find((c) => c.customerId === customerId);

  if (!customer) {
    throw new Error('Customer not found');
  }
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  customer.status = status as Customer['status'];
  const riskScore = calculateRiskScore(customer);
  if (riskScore > 70) {
    console.log(`Alert: High risk customer ${customer.name} with score ${riskScore}`);
  }

  return customer;
};

export const calculateRiskScore = (customer: Customer): number => {
  const creditScoreWeight = 0.4;
  const repaymentWeight = 0.3;
  const loanIncomeRatioWeight = 0.3;

  const repaymentScore = 
    (customer.loanRepaymentHistory.reduce((sum, val) => sum + val, 0) / 
     customer.loanRepaymentHistory.length) * 100;
  const loanIncomeRatio = (customer.outstandingLoans / customer.monthlyIncome) * 100;
  const normalizedLoanIncome = Math.min(100, loanIncomeRatio);

  const score =
    (customer.creditScore / 850) * creditScoreWeight * 100 +
    repaymentScore * repaymentWeight +
    (100 - normalizedLoanIncome) * loanIncomeRatioWeight;

  return Math.round(Math.max(0, Math.min(100, score)));
};