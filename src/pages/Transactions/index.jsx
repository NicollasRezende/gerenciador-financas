// src/pages/Transactions/index.jsx
import React from 'react';
import styled from 'styled-components';
import { Trash } from '@phosphor-icons/react';
import { useTransactions } from '../../contexts/TransactionsContext';
import TransactionForm from '../../components/TransactionForm';
import TransactionFilters from '../../components/TransactionFilters';

const TransactionsPage = styled.div`
    display: grid;
    gap: 1.5rem;
    padding: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
    animation: fadeIn 0.3s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    h1 {
        color: ${(props) => props.theme.text[100]};
        margin: 0;
    }
`;

const TransactionsList = styled.div`
    background: ${(props) => props.theme.background[100]};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TransactionItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => props.theme.background[300]};

    &:last-child {
        border-bottom: none;
    }

    strong {
        color: ${(props) => props.theme.text[100]};
        font-weight: 500;
    }

    span {
        color: ${(props) => props.theme.text[200]};
        font-size: 0.875rem;
    }
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.error};
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        background: ${(props) => props.theme.background[200]};
        transform: scale(1.1);
    }
`;

const ValueText = styled.span`
    color: ${(props) =>
        props.type === 'income' ? props.theme.success : props.theme.error};
    font-weight: 500;
`;

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Transactions = () => {
    const { transactions, removeTransaction } = useTransactions();

    return (
        <TransactionsPage>
            <h1>Transações</h1>
            <TransactionForm />
            <TransactionFilters />

            <TransactionsList>
                {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id}>
                        <div>
                            <strong>{transaction.description}</strong>
                            <span>{transaction.date}</span>
                        </div>
                        <ActionContainer>
                            <ValueText type={transaction.type}>
                                R$ {Math.abs(transaction.value).toFixed(2)}
                            </ValueText>
                            <DeleteButton
                                onClick={() =>
                                    removeTransaction(transaction.id)
                                }
                            >
                                <Trash size={20} />
                            </DeleteButton>
                        </ActionContainer>
                    </TransactionItem>
                ))}
            </TransactionsList>
        </TransactionsPage>
    );
};

export default Transactions;
