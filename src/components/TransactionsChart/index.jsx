// src/components/TransactionsChart/index.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTransactions } from '../../contexts/TransactionsContext';

const TransactionsChart = () => {
    const { transactions } = useTransactions();

    const data = transactions.map((t) => ({
        name: t.description,
        valor: Math.abs(t.value),
    }));

    return (
        <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" fill="#8884d8" />
        </BarChart>
    );
};

export default TransactionsChart;
