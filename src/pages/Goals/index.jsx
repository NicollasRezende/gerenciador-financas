// src/pages/Goals/index.jsx
import React from 'react';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';

const GoalsPage = () => {
    const [goals, setGoals] = useState([
        { id: 1, name: 'Reserva de emergência', target: 10000, current: 5000 },
        { id: 2, name: 'Viagem', target: 5000, current: 2000 },
    ]);
};
