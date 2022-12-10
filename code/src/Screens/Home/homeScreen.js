import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import doceMaria from '../../assets/doce_maria.png'; 
import PrincipalButton from '../../Components/Button/principalButton';
import {
    Container,
} from './styles';

function HomeScreen() {
    const navigate = useNavigate();

    return (
        <Container>
            <img src={doceMaria} alt="Doce Maria" width="400" height="400"/>
            <PrincipalButton text='CRIAR FORMULÁRIO' onClick={() => navigate('/form')} />
        </Container>
    );
}

export default HomeScreen;
