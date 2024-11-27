// src/contexts/TransactionsContext.jsx
import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem('transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    const [filters, setFilters] = useState({
        search: '',
        type: 'all',
    });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transaction) => {
        setTransactions([
            ...transactions,
            { ...transaction, id: Math.random() },
        ]);
    };

    const removeTransaction = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const getFilteredTransactions = () => {
        return transactions.filter((transaction) => {
            const matchesSearch = transaction.description
                .toLowerCase()
                .includes(filters.search.toLowerCase());

            const matchesType =
                filters.type === 'all' ||
                (filters.type === 'income' && transaction.type === 'income') ||
                (filters.type === 'expense' && transaction.type === 'expense');

            return matchesSearch && matchesType;
        });
    };

    const getSummary = () => {
        return transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === 'income') {
                    acc.income += transaction.value;
                    acc.total += transaction.value;
                } else {
                    acc.expense += Math.abs(transaction.value);
                    acc.total -= Math.abs(transaction.value);
                }
                return acc;
            },
            {
                income: 0,
                expense: 0,
                total: 0,
            }
        );
    };

    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                filters,
                setFilters,
                addTransaction,
                removeTransaction,
                getSummary,
                getFilteredTransactions,
            }}
        >
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionsContext);
    if (!context) {
        throw new Error(
            'useTransactions must be used within a TransactionsProvider'
        );
    }
    return context;
};
