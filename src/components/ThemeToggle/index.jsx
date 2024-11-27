// 2. Criar componente ThemeToggle
// src/components/ThemeToggle/index.jsx
import React from 'react';
import styled from 'styled-components';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../../contexts/ThemeContext';

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: ${(props) => (props.theme === 'light' ? '#2c3e50' : '#fff')};
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <ToggleButton onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        </ToggleButton>
    );
};

export default ThemeToggle;
