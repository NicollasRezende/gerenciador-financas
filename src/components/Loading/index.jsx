// src/components/Loading/index.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CurrencyCircleDollar } from '@phosphor-icons/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: ${(props) => props.theme.background[100]};
`;

const IconWrapper = styled.div`
    animation: ${spin} 2s linear infinite;
    color: ${(props) => props.theme.accent[100]};
    font-size: 4rem;
`;

const Loading = () => (
    <LoadingContainer>
        <IconWrapper>
            <CurrencyCircleDollar size={64} />
        </IconWrapper>
    </LoadingContainer>
);

export default Loading;
