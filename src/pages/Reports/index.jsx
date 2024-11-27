// src/pages/Reports/index.jsx
import React, { useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { useTransactions } from '../../contexts/TransactionsContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ExportPdfModal from '../../components/ExportPdfModal';
import 'jspdf-autotable';
import { useTheme } from '../../contexts/ThemeContext'; // Alterar importação
import { breakpoints } from '../../styles/breakpoints';

const ReportsPage = styled.div`
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
`;

const ChartContainer = styled.div`
    background: ${(props) => props.theme.background[100]};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
    overflow-x: auto;

    h2 {
        color: ${(props) => props.theme.text[200]};
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
`;

const StatCard = styled.div`
    background: ${(props) => props.theme.background[100]};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: all 0.3s ease;

    h3 {
        color: ${(props) => props.theme.text[200]};
        font-size: 1rem;
        margin: 0 0 0.5rem 0;
    }

    strong {
        font-size: 1.5rem;
        color: ${(props) => props.color || props.theme.text[100]};
        font-weight: 600;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const FilterContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const Select = styled.select`
    padding: 0.75rem;
    border: 1px solid ${(props) => props.theme.background[300]};
    border-radius: 8px;
    background: ${(props) => props.theme.background[100]};
    color: ${(props) => props.theme.text[200]};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        border-color: ${(props) => props.theme.primary[200]};
    }

    &:focus {
        outline: none;
        border-color: ${(props) => props.theme.primary[100]};
        box-shadow: 0 0 0 2px ${(props) => props.theme.primary[100]}33;
    }
`;

const ExportButton = styled.button`
    padding: 0.75rem 1.5rem;
    background: ${(props) =>
        props.theme.accent[100]}; // Usando a cor de destaque
    color: #ffffff; // Texto branco para garantir contraste
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        background: ${(props) => props.theme.accent[200]};
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

const COLORS = ['#2ecc71', '#e74c3c', '#3498db', '#f1c40f', '#9b59b6'];

const HistoryTable = styled.div`
    background: ${(props) => props.theme.background[100]};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow-x: auto;

    h2 {
        color: ${(props) => props.theme.text[200]};
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid ${(props) => props.theme.background[300]};
        color: ${(props) => props.theme.text[200]};
    }

    th {
        background: ${(props) => props.theme.background[200]};
        font-weight: 600;
    }

    tr:hover {
        background: ${(props) => props.theme.background[200]};
    }
`;

const Reports = () => {
    const { transactions } = useTransactions();
    const [period, setPeriod] = useState('all');
    const [showExportModal, setShowExportModal] = useState(false);
    const reportRef = useRef(null);
    const { currentTheme } = useTheme(); // Usar currentTheme ao invés de theme

    const data = useMemo(() => {
        const filtered =
            period === 'all'
                ? transactions
                : transactions.filter((t) => {
                      const date = new Date(t.date);
                      const now = new Date();
                      const monthsAgo = new Date(
                          now.setMonth(now.getMonth() - parseInt(period))
                      );
                      return date >= monthsAgo;
                  });

        const monthlyData = filtered.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const month = date.toLocaleString('pt-BR', { month: 'long' });

            if (!acc[month]) {
                acc[month] = {
                    month,
                    receitas: 0,
                    despesas: 0,
                    total: 0,
                };
            }

            if (transaction.type === 'income') {
                acc[month].receitas += transaction.value;
                acc[month].total += transaction.value;
            } else {
                acc[month].despesas += Math.abs(transaction.value);
                acc[month].total -= Math.abs(transaction.value);
            }

            return acc;
        }, {});

        return Object.values(monthlyData);
    }, [transactions, period]);

    const categoryData = useMemo(() => {
        const categories = transactions.reduce((acc, t) => {
            const value = Math.abs(t.value);
            if (t.type === 'expense') {
                acc[t.description] = (acc[t.description] || 0) + value;
            }
            return acc;
        }, {});

        return Object.entries(categories)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    }, [transactions]);

    const stats = useMemo(() => {
        const total = transactions.reduce((acc, t) => acc + t.value, 0);
        const receitas = transactions.reduce(
            (acc, t) => (t.type === 'income' ? acc + t.value : acc),
            0
        );
        const despesas = transactions.reduce(
            (acc, t) => (t.type === 'expense' ? acc + Math.abs(t.value) : acc),
            0
        );

        return {
            total,
            receitas,
            despesas,
            media:
                despesas /
                    transactions.filter((t) => t.type === 'expense').length ||
                0,
        };
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter((t) => {
                if (period === 'all') return true;

                const date = new Date(t.date);
                const now = new Date();
                const monthsAgo = new Date(
                    now.setMonth(now.getMonth() - parseInt(period))
                );
                return date >= monthsAgo;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions, period]);

    const generatePDF = async (formData) => {
        const element = reportRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Cabeçalho
        pdf.setFontSize(18);
        pdf.text(formData.title, pdfWidth / 2, 20, { align: 'center' });

        pdf.setFontSize(12);
        pdf.text(`Autor: ${formData.author}`, 20, 30);
        pdf.text(`Data: ${new Date().toLocaleDateString()}`, 20, 37);

        // Descrição
        if (formData.description) {
            pdf.text('Descrição:', 20, 47);
            const splitDescription = pdf.splitTextToSize(
                formData.description,
                pdfWidth - 40
            );
            pdf.text(splitDescription, 20, 54);
        }

        // Gráficos
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(data, 'PNG', 0, 70, pdfWidth, imgHeight);

        // Nova página para o histórico
        pdf.addPage();

        // Título da tabela
        pdf.setFontSize(16);
        pdf.text('Histórico de Transações', 20, 20);

        // Configuração da tabela
        const tableColumns = ['Data', 'Descrição', 'Tipo', 'Valor'];
        const tableRows = filteredTransactions.map((t) => [
            new Date(t.date).toLocaleDateString('pt-BR'),
            t.description,
            t.type === 'income' ? 'Receita' : 'Despesa',
            `R$ ${Math.abs(t.value).toFixed(2)}`,
        ]);

        // Adicionar linha de total
        const total = filteredTransactions.reduce((acc, t) => acc + t.value, 0);
        tableRows.push(['', 'TOTAL', '', `R$ ${Math.abs(total).toFixed(2)}`]);

        // Configurações da tabela
        pdf.setFontSize(10);
        pdf.autoTable({
            head: [tableColumns],
            body: tableRows,
            startY: 30,
            styles: {
                fontSize: 10,
                cellPadding: 5,
            },
            headStyles: {
                fillColor: [44, 62, 80],
                textColor: 255,
                fontStyle: 'bold',
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            columnStyles: {
                0: { cellWidth: 30 }, // Data
                1: { cellWidth: 'auto' }, // Descrição
                2: { cellWidth: 30 }, // Tipo
                3: { cellWidth: 30, halign: 'right' }, // Valor
            },
            didDrawCell: (data) => {
                // Colorir valores de receita em verde e despesa em vermelho
                if (data.section === 'body' && data.column.index === 3) {
                    const transaction = filteredTransactions[data.row.index];
                    if (transaction) {
                        pdf.setTextColor(
                            transaction.type === 'income' ? 46 : 231,
                            transaction.type === 'income' ? 204 : 76,
                            transaction.type === 'income' ? 113 : 60
                        );
                    }
                }
            },
            didParseCell: (data) => {
                // Resetar cor do texto após cada célula
                pdf.setTextColor(0, 0, 0);
            },
        });

        pdf.save(`${formData.title.replace(/\s+/g, '_')}.pdf`);
        setShowExportModal(false);
    };

    return (
        <ReportsPage>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1>Relatórios</h1>
                <ExportButton onClick={() => setShowExportModal(true)}>
                    Exportar PDF
                </ExportButton>
            </div>

            <div ref={reportRef}>
                <FilterContainer>
                    <Select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        <option value="all">Todo período</option>
                        <option value="1">Último mês</option>
                        <option value="3">Últimos 3 meses</option>
                        <option value="6">Últimos 6 meses</option>
                        <option value="12">Último ano</option>
                    </Select>
                </FilterContainer>

                <StatsGrid>
                    <StatCard>
                        <h3>Total</h3>
                        <strong>R$ {stats.total.toFixed(2)}</strong>
                    </StatCard>
                    <StatCard color="#2ecc71">
                        <h3>Total Receitas</h3>
                        <strong>R$ {stats.receitas.toFixed(2)}</strong>
                    </StatCard>
                    <StatCard color="#e74c3c">
                        <h3>Total Despesas</h3>
                        <strong>R$ {stats.despesas.toFixed(2)}</strong>
                    </StatCard>
                    <StatCard color="#3498db">
                        <h3>Média de Gastos</h3>
                        <strong>R$ {stats.media.toFixed(2)}</strong>
                    </StatCard>
                </StatsGrid>

                <ChartContainer>
                    <h2>Balanço Mensal</h2>
                    <BarChart width={800} height={400} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => `R$ ${value.toFixed(2)}`}
                        />
                        <Legend />
                        <Bar
                            dataKey="receitas"
                            fill="#2ecc71"
                            name="Receitas"
                        />
                        <Bar
                            dataKey="despesas"
                            fill="#e74c3c"
                            name="Despesas"
                        />
                    </BarChart>
                </ChartContainer>

                <ChartContainer>
                    <h2>Maiores Despesas</h2>
                    <PieChart width={600} height={400}>
                        {' '}
                        {/* Aumentado a largura */}
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120} // Reduzido o tamanho do círculo
                            innerRadius={60} // Adicionado innerRadius para criar um donut
                            paddingAngle={5} // Espaço entre as fatias
                            label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                name,
                            }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = outerRadius * 1.4; // Aumenta a distância dos labels
                                const x =
                                    cx + radius * Math.cos(-midAngle * RADIAN);
                                const y =
                                    cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill="#333"
                                        textAnchor={x > cx ? 'start' : 'end'}
                                        dominantBaseline="central"
                                        fontSize="12px"
                                    >
                                        {`${name}: R$ ${value.toFixed(2)}`}
                                    </text>
                                );
                            }}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell
                                    key={entry.name}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `R$ ${value.toFixed(2)}`}
                            labelStyle={{ fontSize: '14px' }}
                        />
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            wrapperStyle={{
                                fontSize: '12px',
                                paddingLeft: '20px',
                            }}
                        />
                    </PieChart>
                </ChartContainer>

                <HistoryTable>
                    <h2>Histórico de Transações</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>
                                        {new Date(
                                            transaction.date
                                        ).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td>{transaction.description}</td>
                                    <td>
                                        <span
                                            style={{
                                                color:
                                                    transaction.type ===
                                                    'income'
                                                        ? currentTheme
                                                              .accent[100]
                                                        : currentTheme.error,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {transaction.type === 'income'
                                                ? 'Receita'
                                                : 'Despesa'}
                                        </span>
                                    </td>
                                    <td
                                        style={{
                                            color:
                                                transaction.type === 'income'
                                                    ? currentTheme.accent[100]
                                                    : currentTheme.error,
                                            fontWeight: 500,
                                        }}
                                    >
                                        R${' '}
                                        {Math.abs(transaction.value).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                            <tr
                                style={{
                                    fontWeight: 600,
                                    background: currentTheme.background[200],
                                }}
                            >
                                <td colSpan="3">Total no período</td>
                                <td
                                    style={{
                                        color:
                                            filteredTransactions.reduce(
                                                (acc, t) => acc + t.value,
                                                0
                                            ) >= 0
                                                ? currentTheme.accent[100]
                                                : currentTheme.error,
                                    }}
                                >
                                    R${' '}
                                    {Math.abs(
                                        filteredTransactions.reduce(
                                            (acc, t) => acc + t.value,
                                            0
                                        )
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </HistoryTable>
            </div>

            {showExportModal && (
                <ExportPdfModal
                    onClose={() => setShowExportModal(false)}
                    onExport={generatePDF}
                />
            )}
        </ReportsPage>
    );
};

export default Reports;
