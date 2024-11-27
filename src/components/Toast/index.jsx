// src/components/Toast/index.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const ToastContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${(props) =>
        props.type === 'success' ? '#2ecc71' : '#e74c3c'};
    color: white;
    border-radius: 4px;
    animation: ${slideIn} 0.3s ease;
`;

const Toast = ({ message, type }) => {
    return <ToastContainer type={type}>{message}</ToastContainer>;
};

export default Toast;
