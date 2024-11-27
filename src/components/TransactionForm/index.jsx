// src/components/TransactionForm/index.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus } from '@phosphor-icons/react';
import { useTransactions } from '../../contexts/TransactionsContext';
import { breakpoints } from '../../styles/breakpoints';

const FormContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: grid;
    gap: 15px;
`;

const InputGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
`;

const Select = styled.select`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
`;

const Button = styled.button`
    background: #2ecc71;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: bold;

    &:hover {
        background: #27ae60;
    }
`;

const TransactionForm = () => {
    const { addTransaction } = useTransactions();
    const [formData, setFormData] = useState({
        description: '',
        value: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const transaction = {
            ...formData,
            value:
                formData.type === 'expense'
                    ? -Number(formData.value)
                    : Number(formData.value),
        };

        addTransaction(transaction);

        setFormData({
            description: '',
            value: '',
            type: 'expense',
            date: new Date().toISOString().split('T')[0],
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input
                        type="text"
                        name="description"
                        placeholder="Descrição"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="number"
                        name="value"
                        placeholder="Valor"
                        value={formData.value}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </InputGroup>
                <InputGroup>
                    <Select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="expense">Despesa</option>
                        <option value="income">Receita</option>
                    </Select>
                    <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>
                <Button type="submit">
                    <Plus size={20} />
                    Adicionar Transação
                </Button>
            </Form>
        </FormContainer>
    );
};

export default TransactionForm;
