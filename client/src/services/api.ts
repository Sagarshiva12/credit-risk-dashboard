import axios from 'axios';
import { Customer } from '../types';

const API_URL = 'https://credit-risk-dashboard.onrender.com/api';

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};

export const updateCustomerStatus = async (customerId: string, status: string): Promise<Customer> => {
  const response = await axios.put(`${API_URL}/customers/${customerId}`, { status });
  return response.data;
};