import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const ModalBox = styled.div`
    z-index: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 250px;
    transform: translate(-50%, -50%);
    background: white;
    border: 10px solid white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-align: center;

    @media (min-width: 2560px) {
        height: 250px;
        width: 350px;
        font-size: 1.5rem;
        padding: 0 10px;
    }
`;

export const ModalTitle = styled.h2`
    color: #405cf5;
    margin-bottom: 15px;
`;

export const ModalDescription = styled.span`
    color: black;
    word-wrap:break-word;
`;