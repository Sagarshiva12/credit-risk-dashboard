import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table, Progress, Select, message } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchCustomers, updateCustomerStatus } from '../services/api';
import { Customer } from '../types';

const calculateRiskScore = (customer: Customer): number => {
  const creditScoreWeight = 0.4;
  const repaymentWeight = 0.3;
  const loanIncomeRatioWeight = 0.3;

  const repaymentScore = (customer.loanRepaymentHistory.reduce((sum, val) => sum + val, 0) / customer.loanRepaymentHistory.length) * 100;
  const loanIncomeRatio = (customer.outstandingLoans / customer.monthlyIncome) * 100;
  const normalizedLoanIncome = Math.min(100, loanIncomeRatio);

  const score = (customer.creditScore / 850) * creditScoreWeight * 100 +
               repaymentScore * repaymentWeight +
               (100 - normalizedLoanIncome) * loanIncomeRatioWeight;

  return Math.round(Math.max(0, Math.min(100, score)));
};

const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        message.error('Failed to load customers');
      }
    };
    loadData();
  }, []);

  const handleStatusChange = async (customerId: string, status: string) => {
    try {
      const updatedCustomer = await updateCustomerStatus(customerId, status);
      setCustomers(customers.map((c) => (c.customerId === customerId ? updatedCustomer : c)));
      message.success('Status updated');
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const incomeVsExpensesData = customers.map((c) => ({
    name: c.name,
    income: c.monthlyIncome,
    expenses: c.monthlyExpenses,
  }));

  const riskScoreDistribution = customers.reduce((acc, c) => {
    const score = calculateRiskScore(c);
    const range = Math.floor(score / 20) * 20;
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const riskScoreData = Object.entries(riskScoreDistribution).map(([range, count]) => ({
    range: `${range}-${parseInt(range) + 20}`,
    count,
  }));

  const columns = [
    { title: 'Customer ID', dataIndex: 'customerId', key: 'customerId', sorter: (a: Customer, b: Customer) => a.customerId.localeCompare(b.customerId) },
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name) },
    { title: 'Monthly Income', dataIndex: 'monthlyIncome', key: 'monthlyIncome', sorter: (a: Customer, b: Customer) => a.monthlyIncome - b.monthlyIncome },
    { title: 'Credit Score', dataIndex: 'creditScore', key: 'creditScore', sorter: (a: Customer, b: Customer) => a.creditScore - b.creditScore },
    {
      title: 'Risk Score',
      key: 'riskScore',
      render: (_: any, record: Customer) => {
        const score = calculateRiskScore(record);
        return <Progress percent={score} status={score > 70 ? 'exception' : score > 50 ? 'active' : 'success'} />;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Customer) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.customerId, value)}
          style={{ width: 120 }}
        >
          <Select.Option value="Review">Review</Select.Option>
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Total Customers" value={customers.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Average Income" value={customers.reduce((sum, c) => sum + c.monthlyIncome, 0) / (customers.length || 1)} precision={2} prefix="$" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Average Risk Score" value={customers.reduce((sum, c) => sum + calculateRiskScore(c), 0) / (customers.length || 1)} precision={1} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="High Risk Customers" value={customers.filter((c) => calculateRiskScore(c) > 70).length} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Income vs Expenses">
            <LineChart width={500} height={300} data={incomeVsExpensesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#8884d8" />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Risk Score Distribution">
            <BarChart width={500} height={300} data={riskScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
      </Row>

      <Card title="Customer Data">
        <Table
          columns={columns}
          dataSource={customers}
          rowKey="customerId"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;