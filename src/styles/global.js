// src/styles/global.js
import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './breakpoints';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background: ${(props) => props.theme.background[200]};
    color: ${(props) => props.theme.text[200]};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
