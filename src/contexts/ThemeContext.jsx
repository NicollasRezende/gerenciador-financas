// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    light: {
        primary: {
            100: '#2c3e50', // Azul escuro para o sidebar
            200: '#34495e', // Azul mais escuro para hover
            300: '#507192',
        },
        accent: {
            100: '#27ae60',
            200: '#2ecc71',
            300: '#82e3aa',
        },
        background: {
            100: '#ffffff',
            200: '#f8f9fa',
            300: '#e9ecef',
        },
        text: {
            100: '#ffffff', // Branco para texto no sidebar
            200: '#2c3e50', // Azul escuro para texto principal
            300: '#7f8c8d',
        },
        success: '#27ae60',
        error: '#e74c3c',
    },
    dark: {
        primary: {
            100: '#1e293b', // Slate escuro
            200: '#334155', // Slate médio
            300: '#475569', // Slate claro
        },
        accent: {
            100: '#ffa62b',
            200: '#ffb347',
            300: '#ffc672',
        },
        background: {
            100: '#0f172a', // Fundo mais escuro
            200: '#1e293b', // Fundo médio
            300: '#334155', // Fundo mais claro
        },
        text: {
            100: '#ffffff', // Branco
            200: '#e2e8f0', // Slate claro
            300: '#94a3b8', // Slate médio
        },
        success: '#22c55e',
        error: '#ef4444',
    },
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider
            value={{ theme, toggleTheme, currentTheme: themes[theme] }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
