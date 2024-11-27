// src/pages/Dashboard/index.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Wallet,
    ArrowUp,
    ArrowDown,
    Calendar,
    Trash,
} from '@phosphor-icons/react';
import { useTransactions } from '../../contexts/TransactionsContext';
import TransactionForm from '../../components/TransactionForm';
import TransactionFilters from '../../components/TransactionFilters';
import TransactionsChart from '../../components/TransactionsChart';
import Toast from '../../components/Toast';
import { breakpoints } from '../../styles/breakpoints';

const DashboardContainer = styled.div`
    display: grid;
    gap: 1.5rem;
    padding: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
`;

const Card = styled.div`
    background: ${(props) => props.theme.background[100]};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    h2 {
        color: ${(props) => props.theme.text[200]};
        font-size: 1rem;
        margin: 0;
    }

    h3 {
        color: ${(props) => props.theme.text[100]};
        font-size: 1.5rem;
        margin: 0.5rem 0 0;
        font-weight: 600;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const ChartContainer = styled.div`
    background: ${(props) => props.theme.background[100]};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;

    h2 {
        color: ${(props) => props.theme.text[200]};
        margin-bottom: 1rem;
    }
`;

const TransactionsList = styled.div`
    background: ${(props) => props.theme.background[100]};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h2 {
        color: ${(props) => props.theme.text[200]};
        margin-bottom: 1rem;
    }
`;

const TransactionItem = styled.div`
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => props.theme.background[300]};

    &:last-child {
        border-bottom: none;
    }

    strong {
        color: ${(props) => props.theme.text[100]};
    }
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    color: #2c3e50;
`;

const Dashboard = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const {
        getFilteredTransactions,
        removeTransaction,
        getSummary,
        setFilters,
    } = useTransactions();

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const handleDelete = (id) => {
        removeTransaction(id);
        setToastMessage('Transação removida com sucesso!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const filteredTransactions = getFilteredTransactions();
    const summary = getSummary();

    return (
        <DashboardContainer>
            {showToast && <Toast message={toastMessage} type="success" />}
            <CardsContainer>
                <Card>
                    <CardHeader>
                        <Wallet size={24} />
                        <h2>Saldo Total</h2>
                    </CardHeader>
                    <h3>R$ {summary.total.toFixed(2)}</h3>
                </Card>
                <Card>
                    <CardHeader>
                        <ArrowUp size={24} color="#2ecc71" />
                        <h2>Receitas</h2>
                    </CardHeader>
                    <h3 style={{ color: '#2ecc71' }}>
                        R$ {summary.income.toFixed(2)}
                    </h3>
                </Card>
                <Card>
                    <CardHeader>
                        <ArrowDown size={24} color="#e74c3c" />
                        <h2>Despesas</h2>
                    </CardHeader>
                    <h3 style={{ color: '#e74c3c' }}>
                        R$ {summary.expense.toFixed(2)}
                    </h3>
                </Card>
            </CardsContainer>

            <ChartContainer>
                <TransactionsChart />
            </ChartContainer>

            <TransactionForm />

            <TransactionFilters onFilterChange={handleFilterChange} />

            <TransactionsList>
                <CardHeader>
                    <Calendar size={24} />
                    <h2>Últimas Transações</h2>
                </CardHeader>
                {filteredTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id}>
                        <div>
                            <strong>{transaction.description}</strong>
                            <div>{transaction.date}</div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <span
                                style={{
                                    color:
                                        transaction.type === 'income'
                                            ? '#2ecc71'
                                            : '#e74c3c',
                                }}
                            >
                                R$ {Math.abs(transaction.value).toFixed(2)}
                            </span>
                            <DeleteButton
                                onClick={() => handleDelete(transaction.id)}
                            >
                                <Trash size={20} />
                            </DeleteButton>
                        </div>
                    </TransactionItem>
                ))}
            </TransactionsList>
        </DashboardContainer>
    );
};

export default Dashboard;
