// src/ThemedApp.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { useTheme } from './contexts/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemedApp = () => {
    const { currentTheme } = useTheme();

    return (
        <StyledThemeProvider theme={currentTheme}>
            <TransactionsProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/transactions" element={<Transactions />} />
                            <Route path="/reports" element={<Reports />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </TransactionsProvider>
        </StyledThemeProvider>
    );
};

export default ThemedApp;