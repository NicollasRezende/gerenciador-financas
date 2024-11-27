// src/components/TransactionFilters/index.jsx
import React from 'react';
import styled from 'styled-components';
import { MagnifyingGlass, FunnelSimple } from '@phosphor-icons/react';

const FiltersContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const FilterGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const SearchInput = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    background: #f5f6fa;
    border-radius: 4px;
    border: 1px solid #ddd;

    input {
        flex: 1;
        padding: 10px 0;
        border: none;
        background: none;
        outline: none;
        font-size: 14px;
    }
`;

const Select = styled.select`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f5f6fa;
    cursor: pointer;
`;

const TransactionFilters = ({ onFilterChange }) => {
    return (
        <FiltersContainer>
            <FilterGroup>
                <SearchInput>
                    <MagnifyingGlass size={20} color="#666" />
                    <input
                        type="text"
                        placeholder="Buscar transação..."
                        onChange={(e) =>
                            onFilterChange('search', e.target.value)
                        }
                    />
                </SearchInput>
                <Select
                    onChange={(e) => onFilterChange('type', e.target.value)}
                >
                    <option value="all">Todas</option>
                    <option value="income">Receitas</option>
                    <option value="expense">Despesas</option>
                </Select>
            </FilterGroup>
        </FiltersContainer>
    );
};

export default TransactionFilters;
