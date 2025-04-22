import express, { Request, Response } from 'express';
import { getAllCustomers, updateCustomerStatus } from '../services/customerService';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const customers = getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/:customerId', (req: Request, res: Response) => {
  const { customerId } = req.params;
  const { status } = req.body;

  try {
    const updatedCustomer = updateCustomerStatus(customerId, status);
    res.json(updatedCustomer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;