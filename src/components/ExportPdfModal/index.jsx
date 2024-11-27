// src/components/ExportPdfModal/index.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../styles/breakpoints';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
`;

const Form = styled.form`
    display: grid;
    gap: 15px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 100px;
`;

const Button = styled.button`
    padding: 10px;
    background: #2ecc71;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #27ae60;
    }
`;

const ExportPdfModal = ({ onClose, onExport }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onExport(formData);
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <h2>Exportar Relatório</h2>
                <Form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Título do relatório"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        required
                    />
                    <Input
                        placeholder="Autor"
                        value={formData.author}
                        onChange={(e) =>
                            setFormData({ ...formData, author: e.target.value })
                        }
                        required
                    />
                    <TextArea
                        placeholder="Descrição do relatório"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                    <Button type="submit">Gerar PDF</Button>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ExportPdfModal;
