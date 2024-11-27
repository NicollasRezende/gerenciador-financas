// src/components/Layout/index.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { List, X, CurrencyCircleDollar } from '@phosphor-icons/react';
import ThemeToggle from '../ThemeToggle';
import { breakpoints } from '../../styles/breakpoints';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
        color: ${(props) => props.theme.accent[100]};
    }
`;

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
`;

const Sidebar = styled.aside`
    width: ${(props) => (props.isOpen ? '250px' : '0')};
    background: ${(props) => props.theme.primary[100]};
    padding: ${(props) => (props.isOpen ? '20px' : '0')};
    color: ${(props) => props.theme.text[100]};
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const SidebarHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
    position: relative;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: ${(props) => props.theme.text[100]};
    }
`;

const ControlsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 0 1rem;
`;

const NavHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ToggleButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: ${(props) => props.theme.text[100]};
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.3s ease;
    z-index: 10;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;

const ThemeToggleContainer = styled.div`
    position: absolute;
    top: 1rem;
    right: ${(props) => (props.isOpen ? '60px' : '-100px')};
    transition: all 0.3s ease;
    z-index: 10;
`;

const NavContainer = styled.div`
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.3s ease;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 20px;
    background: ${(props) => props.theme.background[200]};
    color: ${(props) => props.theme.text[200]};
    margin-left: ${(props) => (props.sidebarOpen ? '250px' : '0')};
    transition: margin 0.3s ease;
`;

const NavLink = styled(Link)`
    color: ${(props) => props.theme.text[100]};
    text-decoration: none;
    padding: 1rem;
    display: block;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover,
    &.active {
        background: ${(props) => props.theme.primary[200]};
        color: #ffffff; // Garantir contraste
    }
`;

const MenuButton = styled.button`
    position: fixed;
    top: 20px;
    left: ${(props) => (props.isOpen ? '-100px' : '20px')};
    background: ${(props) => props.theme.primary[100]};
    color: ${(props) => props.theme.text[100]};
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;

    &:hover {
        background: ${(props) => props.theme.primary[200]};
        transform: scale(1.05);
    }
`;

const Card = styled.div`
    background: ${(props) => props.theme.background[100]};
    color: ${(props) => props.theme.text[200]};
`;

const DeleteButton = styled.button`
    color: ${(props) => props.theme.accent[100]};
`;

// Atualizar o componente Layout
const Layout = ({ children }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <LayoutContainer>
            <MenuButton isOpen={isOpen} onClick={() => setIsOpen(true)}>
                <List size={24} />
            </MenuButton>

            <Sidebar isOpen={isOpen}>
                <SidebarHeader>
                    <TitleContainer>
                        <CurrencyCircleDollar size={32} />
                        <h1>Finanças</h1>
                    </TitleContainer>
                    <ControlsContainer>
                        <ThemeToggle />
                        <ToggleButton onClick={() => setIsOpen(false)}>
                            <X size={24} />
                        </ToggleButton>
                    </ControlsContainer>
                </SidebarHeader>

                <NavContainer isOpen={isOpen}>
                    <nav>
                        <ul>
                            <NavLink
                                to="/"
                                className={
                                    location.pathname === '/' ? 'active' : ''
                                }
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/transactions"
                                className={
                                    location.pathname === '/transactions'
                                        ? 'active'
                                        : ''
                                }
                            >
                                Transações
                            </NavLink>
                            <NavLink
                                to="/reports"
                                className={
                                    location.pathname === '/reports'
                                        ? 'active'
                                        : ''
                                }
                            >
                                Relatórios
                            </NavLink>
                        </ul>
                    </nav>
                </NavContainer>
            </Sidebar>
            <MainContent>{children}</MainContent>
        </LayoutContainer>
    );
};

export default Layout;
