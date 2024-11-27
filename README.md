# Gerenciador de Finanças

## Descrição

O Gerenciador de Finanças é uma aplicação web desenvolvida para ajudar os usuários a gerenciar suas finanças pessoais. A aplicação permite que os usuários registrem transações, visualizem relatórios financeiros e exportem dados em formato PDF.

## Funcionalidades

-   **Dashboard**: Visão geral das finanças, incluindo saldo total, receitas e despesas.
-   **Transações**: Registro de transações financeiras com descrição, valor, tipo (receita ou despesa) e data.
-   **Relatórios**: Visualização de gráficos e tabelas com dados financeiros, incluindo balanço mensal e maiores despesas.
-   **Exportação de PDF**: Geração de relatórios financeiros em formato PDF.

## Tecnologias Utilizadas

-   **React**: Biblioteca JavaScript para construção de interfaces de usuário.
-   **Styled-components**: Biblioteca para estilização de componentes em React.
-   **Recharts**: Biblioteca para criação de gráficos em React.
-   **jspdf**: Biblioteca para geração de arquivos PDF.
-   **html2canvas**: Biblioteca para captura de screenshots de elementos HTML.

## Estrutura do Projeto

gerenciador-financascd/
├── public/
│ ├── index.html
│ ├── favicon.ico
│ ├── logo192.png
│ ├── logo512.png
│ └── manifest.json
├── src/
│ ├── components/
│ │ ├── ExportPdfModal/
│ │ │ └── index.jsx
│ │ ├── Layout/
│ │ │ └── index.jsx
│ │ ├── Loading/
│ │ │ └── index.jsx
│ │ ├── ThemeToggle/
│ │ │ └── index.jsx
│ │ ├── Toast/
│ │ │ └── index.jsx
│ │ └── TransactionForm/
│ │ └── index.jsx
│ ├── contexts/
│ │ ├── ThemeContext.jsx
│ │ └── TransactionsContext.jsx
│ ├── pages/
│ │ ├── Dashboard/
│ │ │ └── index.jsx
│ │ ├── Reports/
│ │ │ └── index.jsx
│ │ └── Transactions/
│ │ └── index.jsx
│ ├── styles/
│ │ ├── breakpoints.js
│ │ └── global.js
│ ├── App.js
│ ├── index.js
│ └── ThemedApp.js
├── .gitignore
├── package.json
└── README.md

## Responsividade

Atualmente, a aplicação não está totalmente otimizada para dispositivos móveis. A responsividade será implementada em futuras atualizações.
