import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    padding: 2rem 2rem 2rem 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 1024px) {
        padding: 2rem 2rem 2rem 7rem;
    }

    @media (max-width: 800px) {
        padding: 2rem 2rem 2rem 4.5rem;
    }

    @media (max-width: 750px) {
        padding: 2rem;
    }
`;

export const Column = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
`;

export const FirstSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

export const MultiItemsInputsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

export const Title = styled.div`
    width: 100%;
    color: #ea4e73;
    font-weight: bold;
    font-size: 1.7rem;
    margin-bottom: 3rem;
    text-align: center;
    display: flex;
    flex-direction: row;
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