import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import styled from 'styled-components';
import { DashboardContext } from '../../context/DashboardContext';

const Title = styled.h5`
  font-weight: bold;
  text-align: center;
`;

const OrdersChart = () => {
  const { orders } = useContext(DashboardContext);

  const getUniqueDates = () => {
    const uniqueDates = [];
    orders.forEach((order) => {
      const orderDate = order.created_at;
      if (!uniqueDates.includes(orderDate)) {
        uniqueDates.push(orderDate);
      }
    });
    return uniqueDates;
  };

  const countOrdersPerDay = () => {
    const uniqueDates = getUniqueDates();
    const orderCounts = [];

    uniqueDates.forEach((date) => {
      const count = orders.filter((order) => order.created_at === date).length;
      orderCounts.push(count);
    });

    return orderCounts;
  };

  const chartData = getUniqueDates().map((date, index) => ({
    date,
    count: countOrdersPerDay()[index],
  }));

  return (
    <>
      <Title className="my-4">Orders per Date</Title>
      <BarChart width={900} height={400} data={chartData} style={{ margin: '0 auto' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
        <Label value="" position="top" offset={20} />
      </BarChart>
    </>
  );
};

export default OrdersChart;